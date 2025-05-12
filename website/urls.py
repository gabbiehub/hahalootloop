from django.urls import path
from website import views
from website.views import landing, registration, login, forgot_password, reset_password, set_username, set_password, homepage

urlpatterns = [
    path('', landing, name='landing'),
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('forgot-password/', forgot_password, name='forgot_password'),
    path('reset-password/', reset_password, name='reset_password'),
    path('set-username/', set_username, name='set_username'),
    path('set-password/', set_password, name='set_password'),
    path('homepage/', homepage, name='homepage'),
    path('profile/', views.profile_view, name='profile'),
    path('chat/messages/', views.get_chat_messages, name='chat_messages'),
]