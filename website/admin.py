from django.contrib import admin
from .models import Item,UserProfile
from django.utils.html import format_html

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'category', 'rarity', 'created_at', 'item_image')  # columns in list view
    list_filter = ('category', 'rarity', 'tradability')  # side filters
    search_fields = ('name', 'description')  # search bar
    ordering = ('-created_at',)  # default ordering
    date_hierarchy = 'created_at'

    def item_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"

admin.site.register(Item, ItemAdmin)
# Register your models here.

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'profile_picture', 'following_count', 'followers_count')
    list_filter = ('user',)
    search_fields = ('user__username', 'bio')
    readonly_fields = ('following_count', 'followers_count')

    def following_count(self, obj):
        return obj.following_count()
    following_count.short_description = 'Following'

    def followers_count(self, obj):
        return obj.followers_count()
    followers_count.short_description = 'Followers'
