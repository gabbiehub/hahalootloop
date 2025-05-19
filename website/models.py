from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    RARITY_CHOICES = [
        ('Common', 'Common'),
        ('Rare', 'Rare'),
        ('Legendary', 'Legendary'),
        ('Mythic', 'Mythic'),
    ]
    CATEGORY_CHOICES = [
        ('Antiques', 'Antiques'),
        ('Figurines', 'Figurines'),
        ('Books', 'Books'),
        ('Jewelry', 'Jewelry'),
        ('Furniture', 'Furniture'),
        ('Cars', 'Cars'),
        ('Currency', 'Currency'),
        ('Toys', 'Toys'),
    ]
    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Like New', 'Like New'),
        ('Used', 'Used'),
        ('Damaged', 'Damaged'),
    ]
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    rarity = models.CharField(max_length=20, choices=RARITY_CHOICES, null=True, blank=True)
    image = models.ImageField(upload_to='items/', null=True, blank=True)
    tradability = models.BooleanField(default=True)
    shelf = models.CharField(max_length=100, null=True, blank=True)
    date_acquired = models.DateField(null=True, blank=True)
    other_notes = models.TextField(null=True, blank=True)
    receipt = models.ImageField(upload_to='receipts/', null=True, blank=True)
    dimensions = models.CharField(max_length=100, null=True, blank=True)
    weight = models.CharField(max_length=50, null=True, blank=True)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} by {self.user.username}" 
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

    def following_count(self):
        return self.following.count()

    def followers_count(self):
        return self.followers.count()