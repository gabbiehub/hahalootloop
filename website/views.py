from django.shortcuts import render, redirect

def landing(request):
    return render(request, 'landing.html')

def registration(request):
    return render(request, 'registration.html')

def login(request):
    if request.method == 'POST':
        return redirect('homepage') 
    return render(request, 'login.html')

def forgot_password(request):
    if request.method == 'POST':
        # Handle forgot password logic
        return redirect('reset_password')
    return render(request, 'forgot_password.html')

def reset_password(request):
    if request.method == 'POST':
        return redirect('landing')
    return render(request, 'reset_password.html')

def set_username(request):
    if request.method == 'POST':
        return redirect('registration')
    return redirect('registration')

def set_password(request):
    if request.method == 'POST':
        return redirect('homepage')
    return redirect('registration')

def homepage(request):
    return render(request, 'homepage.html')

def profile_view(request):
    return render(request, 'profile.html')

def get_chat_messages(request):
    return render(request, 'chat_messages.html')

#upload item modal
from django.contrib.auth.decorators import login_required
from .models import Item
from django.http import JsonResponse
import os

@login_required
def upload_item(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        category = request.POST.get('itemType')
        shelf = request.POST.get('shelf')
        tradability = request.POST.get('tradability') == 'Enabled'
        image = request.FILES.get('file')
        
        item = Item(
            user=request.user,
            name=name,
            description=description,
            category=category,
            shelf=shelf,
            tradability=tradability,
            image=image
        )
        item.save()
        return JsonResponse({'status': 'success', 'message': 'Item uploaded successfully'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)