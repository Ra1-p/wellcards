from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserInfoSerializer, EmailChangeSerializer, RegisterSerializer
from .services import edit_object, get_user


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserInfoAPIView(APIView):
    def get(self, request) -> Response:
        user = get_user(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))

        serializer = UserInfoSerializer(user)
        return Response(serializer.data)


class EditUserEmailAPIView(APIView):
    def put(self, request) -> Response:
        serializer = EmailChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = get_user(request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))

        if user.username != serializer.validated_data['username']:
            edit_object(user, username=serializer.validated_data['username'])
            return Response({'username': serializer.validated_data['username']})

        return Response({'error': 'email is already used/bad request'}, status=status.HTTP_400_BAD_REQUEST)


class EditUserDataAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer

    def get_object(self) -> object:
        return get_user(self.request.META.get('HTTP_AUTHORIZATION').replace('Bearer ', ''))
