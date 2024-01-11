from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import User


class UserRegistrationForm(UserCreationForm):
    first_name = forms.CharField(label='Enter your first name')
    last_name = forms.CharField(label='Enter your last name')
    username = forms.EmailField(required=True, label='Enter your e-mail', widget=forms.EmailInput())
    password1 = forms.CharField(label='Enter your password', widget=forms.PasswordInput(attrs={
        'class': 'form_password'
    }))
    telegram = forms.CharField(label='TTelegram')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('password2')

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password1', 'telegram']


class LoginForm(AuthenticationForm):
    username = forms.CharField(label='Email', widget=forms.TextInput(attrs={'class': 'form__input'}))
    password = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'class': 'form__input form__password'}))
