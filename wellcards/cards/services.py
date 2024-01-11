import requests

from .models import Bin, Balance, Card, CardDetail, ApiToken

domain = 'https://api.spenxy.com'


def get_request_to_spenxy(endpoint: str, params: dict):
    """"Send GET request to Spenxy"""
    return (requests.get(
        domain + endpoint,
        headers={
            'Authorization': f'Bearer {ApiToken.objects.get(id=1).token}'
        },
        params=params
    ).json())


def post_requests_to_spenxy(payload, endpoint: str) -> [dict] or dict:
    """"Send POST request to Spenxy"""
    response = requests.post(
        domain + endpoint,
        headers={
            'Authorization': f'Bearer {ApiToken.objects.get(id=1).token}',
            'Content-Type': 'application/json'
        },
        data=payload
    ).json()
    # Delete unusable in model Card fields from JSON response
    if response['form_factor']:
        keys_to_del = [
            'cardholder_id',
            'form_factor',
            'settings',
            'user'
        ]
        for key in keys_to_del:
            response.pop(key, None)
        card_bin = response['bin']
        card_balance = response['balance']
        response.pop('bin')
        response.pop('balance')
        return [card_bin, card_balance, response]
    return response


def create_card_bin_and_balance(response_card_bin: dict, response_card_balance: dict, card: object):
    Bin.objects.create(
        scheme=response_card_bin['scheme'],
        code=response_card_bin['code'],
        card=card
    )

    Balance.objects.create(
        spenxy_card_id=response_card_balance['card_id'],
        limit=response_card_balance['limit'],
        available=response_card_balance['available'],
        used=response_card_balance['used'],
        opening_balance=response_card_balance['opening_balance'],
        topup_balance=response_card_balance['topup_balance'],
        limit_per_transaction=response_card_balance['limit_per_transaction'],
        pending_balance=response_card_balance['pending_balance'],
        fees_balance=response_card_balance['fees_balance'],
        incoming_balance=response_card_balance['incoming_balance'],
        withdrawal_balance=response_card_balance['withdrawal_balance'],
        card=card)


def check_user_balance(data: dict, user_balance: int) -> bool:
    try:
        return data['limit_all_time'] <= user_balance
    except KeyError:
        return user_balance >= 25


def check_card_to_close(card_id) -> bool:
    try:
        card = Card.objects.get(card_id=card_id)

    except Card.DoesNotExist:
        return False

    if not card or card.status != "ACTIVE":
        return False

    return True


def create_card_detail(card: object):
    response = get_request_to_spenxy(
        '/api/v1/cards/card/detail/sensitive',
        {
            'card_id': card.pk
        }
    )
    CardDetail.objects.create(
        card=card,
        card_number=response['card_number'],
        cvv=response['cvv'],
        expiry_month=response['expiry_month'],
        expiry_year=response['expiry_year'],
        name_on_card=response['name_on_card']
    )


def get_cards_detail(user: object) -> list:
    cards_detail = []

    for card in user.cards.select_related('detail').all():
        cards_detail.append({
            'card_number': card.detail.card_number,
            'cvv': card.detail.cvv,
            'expiry_month': card.detail.expiry_month,
            'expiry_year': card.detail.expiry_year
        })
    return cards_detail
