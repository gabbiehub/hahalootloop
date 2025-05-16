from django.contrib import admin
from .models import Item
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
