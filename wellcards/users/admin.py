from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'telegram', 'is_staff', 'balance')
    search_fields = ('username', 'telegram')
    list_filter = ('username', 'telegram')
    list_editable = ('telegram', 'balance', 'username')


admin.site.register(User, UserAdmin)

# Register your models here.
