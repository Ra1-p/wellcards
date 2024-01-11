from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import UserInfoAPIView, EditUserEmailAPIView, \
    EditUserDataAPIView, RegisterAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserInfoAPIView.as_view()),
    path('email/change/', EditUserEmailAPIView.as_view()),
    path('change/account/me/', EditUserDataAPIView.as_view()),
]
