from django.urls import path

from .views import GetAllCardsAPIView, CreateNewCardAPIView, CloseCardAPIView, GetCardsDetailAPIView

urlpatterns = [
    path('all/', GetAllCardsAPIView.as_view()),
    path('card/add/', CreateNewCardAPIView.as_view()),
    path('card/close/', CloseCardAPIView.as_view()),
    path('card/detail/', GetCardsDetailAPIView.as_view())
]
