import os

from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wellcards.settings')

app = Celery('wellcards')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'get_api_token_every_6_mins': {
        'task': 'cards.tasks.get_api_token',
        'schedule': crontab(minute='*/1')
    },
    'update_card_balance_every_6_mins': {
        'task': 'cards.tasks.update_card_balance',
        'schedule': crontab(minute='*/1')
    }
}
