import json

from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from users.services import edit_object, get_user

from .serializers import CardSerializer, TransactionSerializer
from .models import Card, CardTransactions
from .services import post_requests_to_spenxy, check_user_balance, create_card_bin_and_balance, check_card_to_close, \
    create_card_detail, get_request_to_spenxy, get_cards_detail


class GetAllCardsAPIView(ListAPIView):
    """"API View to get all user cards"""
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(user=get_user(self.request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', '')))


class CreateNewCardAPIView(CreateAPIView):
    """"API View to create card"""
    serializer_class = CardSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data
        user = get_user(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))
        if check_user_balance(payload, user.balance):
            payload['bin'] = '54054255'
            response = post_requests_to_spenxy(
                json.dumps({
                    'user_email': 'danil.flexcard@gmail.com',
                    **payload
                }),
                '/api/v1/cards/card/add')
            response[2]['user'] = user.pk

            serializer = self.serializer_class(data={
                **response[2],
                'available': response[1]['available']
            })
            serializer.is_valid(raise_exception=True)
            card = serializer.save()

            create_card_bin_and_balance(response[0], response[1], card)

            edit_object(user, balance=(user.balance - response[1]['available']))

            create_card_detail(card)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                'error_message': 'user has not enough money/bad request'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class CloseCardAPIView(APIView):
    """"API View to close the card"""

    def put(self, request):
        payload = request.data
        card_id = payload['card_id']

        user = get_user(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))

        if not check_card_to_close(card_id):
            return Response(
                {
                    'error message': 'card was not closed/request error'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        response = post_requests_to_spenxy(json.dumps({'card_id': card_id}),
                                           '/api/v1/cards/card/close')[2]

        card = Card.objects.get(card_id=card_id)
        card.status = response['status']
        card.save()

        edit_object(user, balance=(user.balance + card.balance.available))

        return Response(
            {
                'message': 'card was successfully closed'
            },
            status=status.HTTP_200_OK
        )


class GetAllTransactionsAPIView(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return CardTransactions.objects.filter(
            card_id__user=get_user(self.request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))
        )


class GetCardsDetailAPIView(APIView):
    def get(self, request):
        user = get_user(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))
        return Response(get_cards_detail(user), status=status.HTTP_200_OK)
