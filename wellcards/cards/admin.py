from django.contrib import admin

from .models import Card, Bin, Balance, CardDetail


class CardAdmin(admin.ModelAdmin):
    list_display = ('card_id', 'mask_number', 'status', 'brand', 'user', 'available')
    search_fields = ('card_id', 'mask_number', 'user')
    list_filter = ('user', )


class BalanceAdmin(admin.ModelAdmin):
    list_display = ('card', 'available')
    search_fields = ('card', )
    list_filter = ('card', 'available')


class CardDetailAdmin(admin.ModelAdmin):
    list_display = ('card', 'card_number', 'cvv', 'expiry_month', 'expiry_year')
    search_fields = ('card', 'card_number')
    list_filter = ('card', 'card_number')


admin.site.register(CardDetail, CardDetailAdmin)
admin.site.register(Card, CardAdmin)
admin.site.register(Bin)
admin.site.register(Balance, BalanceAdmin)
