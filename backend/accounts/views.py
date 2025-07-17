from .serializers import SignupSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
