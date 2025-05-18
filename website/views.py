from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Item
from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Item
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import json

def landing(request):
    return render(request, 'landing.html')

def registration(request):
    return render(request, 'registration.html')

def login(request):
    if request.method == 'POST':
        return redirect('homepage') 
    return render(request, 'landing.html')

def forgot_password(request):
    if request.method == 'POST':
        # Handle forgot password logic
        return redirect('reset_password')
    return render(request, 'forgot_password.html')

def reset_password(request):
    if request.method == 'POST':
        return redirect('landing')
    return render(request, 'reset_password.html')

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.db import IntegrityError
import re

def register_user(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=405)
    
    try:
        print(f"POST data: {request.POST}")
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Validate inputs
        if not all([email, username, password, confirm_password]):
            return JsonResponse({'success': False, 'error': 'Missing required fields.'}, status=400)
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            return JsonResponse({'success': False, 'error': 'Invalid email format.'}, status=400)
        if password != confirm_password:
            return JsonResponse({'success': False, 'error': 'Passwords do not match.'}, status=400)
        if len(password) < 8:
            return JsonResponse({'success': False, 'error': 'Password must be at least 8 characters.'}, status=400)
        if not any(c.isupper() for c in password):
            return JsonResponse({'success': False, 'error': 'Password must include an uppercase letter.'}, status=400)
        if not (any(c.isdigit() for c in password) and any(c in '!@#$%^&*' for c in password)):
            return JsonResponse({'success': False, 'error': 'Password must include a number and special character.'}, status=400)
        
        # Check for existing user
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': 'Username already taken.'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already registered.'}, status=400)
        
        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        
        # Log the user in
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        
        return JsonResponse({'success': True, 'redirect': '/homepage/'})
    
    except IntegrityError:
        return JsonResponse({'success': False, 'error': 'Username or email already exists.'}, status=400)
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return JsonResponse({'success': False, 'error': f'Server error: {str(e)}'}, status=500)

@login_required
def homepage(request):
    return render(request, 'homepage.html', {'user': request.user})

def profile_view(request):
    return render(request, 'profile.html', {'user': request.user})

def get_chat_messages(request):
    return render(request, 'chat_messages.html', {'user': request.user})

def logout_view(request):
    logout(request)  # Ends the user authentication session
    request.session.flush()  # Clears all session data
    return redirect('login')

def upload_item(request):
    if request.method == 'POST':
        print("POST data:", request.POST)
        print("FILES:", request.FILES)
        item_id = request.POST.get('item_id')
        print("item_id from POST:", item_id)  # Add this for debugging

        if item_id:
            try:
                # Validate item_id
                if not item_id.isdigit():
                    return JsonResponse({'status': 'error', 'message': 'Invalid item_id: must be a number'}, status=400)
                item_id = int(item_id)  # Convert to integer
                # Since user might be None, don't filter by user
                print("Fetching item with id:", item_id)  # Add this for debugging
                item = Item.objects.get(id=item_id)
                date_acquired_str = request.POST.get('dateAcquired')
                if date_acquired_str:
                    item.date_acquired = datetime.strptime(date_acquired_str, '%m/%d/%Y').date()
                item.other_notes = request.POST.get('otherNotes')
                item.dimensions = request.POST.get('dimensions')
                item.weight = request.POST.get('weight')
                item.condition = request.POST.get('condition')
                if request.FILES.get('receipt'):
                    item.receipt = request.FILES.get('receipt')
                item.save()
                return JsonResponse({'status': 'success', 'message': 'Item details updated successfully', 'item_id': item.id})
            except Item.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Item not found'}, status=404)
            except ValueError as e:
                return JsonResponse({'status': 'error', 'message': f'Invalid date format: {str(e)}'}, status=400)
            except Exception as e:
                print("Update error:", str(e))
                return JsonResponse({'status': 'error', 'message': f'Server error: {str(e)}'}, status=500)

        else:
            name = request.POST.get('name')
            description = request.POST.get('description')
            category = request.POST.get('itemType')
            shelf = request.POST.get('shelf')
            tradability = request.POST.get('tradability') == 'Enabled'
            image = request.FILES.get('file')

            # Validate required fields
            if not name:
                return JsonResponse({'status': 'error', 'message': 'Name is required'}, status=400)
            if not description:
                return JsonResponse({'status': 'error', 'message': 'Description is required'}, status=400)
            if not category or category == 'Select type':
                return JsonResponse({'status': 'error', 'message': 'Valid item type is required'}, status=400)
            if category not in dict(Item.CATEGORY_CHOICES):
                return JsonResponse({'status': 'error', 'message': f'Invalid category: {category}'}, status=400)

            try:
                item = Item(
                    user=None,
                    name=name,
                    description=description,
                    category=category,
                    shelf=shelf,
                    tradability=tradability,
                    image=image
                )
                item.save()
                return JsonResponse({'status': 'success', 'message': 'Item uploaded successfully', 'item_id': item.id})
            except Exception as e:
                print("Create error:", str(e))
                return JsonResponse({'status': 'error', 'message': f'Server error: {str(e)}'}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

from django.shortcuts import render

def category_results(request, category):
    return render(request, 'category-results.html', {'category': category})


