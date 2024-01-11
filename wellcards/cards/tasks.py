import os
from datetime import datetime, timedelta

import requests

from .models import CardTransactions, Card
from .models import ApiToken
from wellcards.celery import app
from wellcards.settings import CLIENT_ID, API_KEY

domain = 'https://api.spenxy.com'


@app.task
def get_api_token():
    """"Send POST request to Spenxy to get API Token"""
    token = requests.post(
        'https://api.spenxy.com/api/v1/authentication/login',
        headers={
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'x-client-id': CLIENT_ID},
        data=''
    ).json()['access_token']
    token_model = ApiToken.objects.get(id=1)
    token_model.token = token
    token_model.save()
    return token


def get_request_to_spenxy(endpoint: str, params=None):
    """"Send GET request to Spenxy"""
    if params is None:
        params = {}
    return requests.get(domain + endpoint,
                        headers={'Authorization': f'Bearer {ApiToken.objects.get(id=1).token}'},
                        params=params).json()


@app.task
def update_card_balance():
    response = get_request_to_spenxy('/api/v1/cards/all')
    for i in response:
        print(i)
        card = Card.objects.filter(card_id=i['card_id']).first()
        if card is not None and i['balance']['available'] != card.balance.available:
            card.balance.available = i['balance']['available']

# @app.task
# def new_transactions():
#     five_minutes_earlier = datetime.now() - timedelta(minutes=5)
#     response = get_request_to_spenxy('/api/v1/cards/transactions',
#                                      {'from_created_at': five_minutes_earlier.isoformat(),
#                                       'to_created_at': datetime.now().isoformat()})
#     for i in response:
#         if i['id'] not in CardTransactions.objects.all().values_list('id', flat=True):
#             CardTransactions.objects.create(id=i['id'],
#                                             bin=i['bin'],
#                                             card_id=i['card_id'],
#                                             mask_number=i['mask_number'],
#                                             card_memo=i['card_memo'],
#                                             card_status=i['card_status'],
#                                             date=i['date'],
#                                             billing_amount=i['billing_amount'],
#                                             billing_currency=i['billing_currency'],
#                                             amount=i['amount'],
#                                             currency=i['currency'],
#                                             charge=i['charge'],
#                                             status=i['status'],
#                                             merchant_name=i['merchant_name'],
#                                             type=i['type']
#                                             )
