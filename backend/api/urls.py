from django.urls import path
from .views import hello_blry

urlpatterns = [
    path('hello/', hello_blry),
]
