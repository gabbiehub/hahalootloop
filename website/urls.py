from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('registration/', views.registration, name='registration'),
    path('login/', views.login_view, name='login'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('register-user/', views.register_user, name='register_user'),
    path('homepage/', views.homepage, name='homepage'),
    path('profile/', views.profile_view, name='profile'),
    path('chat-messages/', views.get_chat_messages, name='chat_messages'),
    path('logout/', views.logout_view, name='logout'),
    path('upload_item/', views.upload_item, name='upload_item'),
    path('category-results/<str:category>/', views.category_results, name='category_results'),
    path('item/<str:item_name>/', views.item_details, name='item_details'),
    path('update-bio/', views.update_bio, name='update_bio'),
]