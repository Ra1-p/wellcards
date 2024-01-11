from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """"Extended User model"""
    telegram = models.CharField(max_length=150, unique=True)
    balance = models.FloatField(default=0)
