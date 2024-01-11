from rest_framework import serializers

from .models import Card, CardTransactions, CardDetail


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardTransactions
        fields = '__all__'


class CardDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardDetail
        fields = ('card_number', 'cvv', 'expiry_month', 'expiry_year')
