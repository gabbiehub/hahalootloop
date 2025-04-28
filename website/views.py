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