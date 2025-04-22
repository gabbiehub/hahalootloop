from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Maps the root URL (e.g., '/') to the index view
]