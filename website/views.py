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
from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Item
from datetime import datetime

# @login_required  # Already commented out
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
