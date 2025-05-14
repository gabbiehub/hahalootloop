from django.urls import path
from website.views import landing, registration, login, forgot_password, reset_password, set_username, set_password, homepage, profile_view, get_chat_messages, upload_item
from django.conf import settings
from django.views.generic import TemplateView  # Add this import
from . import views  # Existing views import
from django.conf.urls.static import static

urlpatterns = [
    path('', landing, name='landing'),
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('forgot-password/', forgot_password, name='forgot_password'),
    path('reset-password/', reset_password, name='reset_password'),
    path('set-username/', set_username, name='set_username'),
    path('set-password/', set_password, name='set_password'),
    path('homepage/', homepage, name='homepage'),
    path('profile/', profile_view, name='profile'),
    path('chat/messages/', get_chat_messages, name='chat_messages'),
    path('upload-item/', upload_item, name='upload_item'),
    path('item-details/', TemplateView.as_view(template_name='item-details.html'), name='item_details'),
    # Catch-all pattern (move to end if present)
    #path('^(?P<path>.*)$', views.serve_static, name='static'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)