from django.db import models

from users.models import User


class Card(models.Model):
    card_id = models.CharField(max_length=255, primary_key=True)
    created_at = models.CharField(max_length=255)
    closed_at = models.CharField(max_length=255, null=True, blank=True)
    mask_number = models.CharField(max_length=16)
    nick_name = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    is_autolimit = models.BooleanField()
    is_withdrawable = models.BooleanField()
    available = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')

    def __str__(self):
        return str(self.mask_number)


class Bin(models.Model):
    scheme = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    card = models.OneToOneField(Card, on_delete=models.CASCADE, related_name='bin')

    def __str__(self):
        return str(self.code)


class Balance(models.Model):
    spenxy_card_id = models.CharField(max_length=255, primary_key=True)
    limit = models.FloatField()
    available = models.FloatField()
    used = models.FloatField()
    opening_balance = models.FloatField()
    topup_balance = models.FloatField()
    limit_per_transaction = models.FloatField()
    pending_balance = models.FloatField()
    fees_balance = models.FloatField()
    incoming_balance = models.FloatField()
    withdrawal_balance = models.FloatField()
    card = models.OneToOneField(Card, on_delete=models.CASCADE, related_name='balance')

    def __str__(self):
        return str(self.card)


class CardDetail(models.Model):
    card = models.OneToOneField(Card, on_delete=models.CASCADE, related_name='detail')
    card_number = models.CharField(max_length=255)
    cvv = models.CharField(max_length=3)
    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()
    name_on_card = models.CharField(max_length=255)

    def __str__(self):
        return str(self.card_number)


class CardTransactions(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    bin = models.CharField(max_length=255)
    card_id = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='transactions')
    mask_number = models.CharField(max_length=16)
    card_memo = models.CharField(max_length=255)
    card_status = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    billing_amount = models.FloatField()
    billing_currency = models.CharField(max_length=255)
    amount = models.FloatField()
    currency = models.CharField(max_length=255)
    charge = models.FloatField()
    status = models.CharField(max_length=255)
    merchant_name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)


class ApiToken(models.Model):
    token = models.CharField(max_length=256)
