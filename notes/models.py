from django.db import models
from django_extensions.db.models import TimeStampedModel


class Note(TimeStampedModel):
    user = models.ForeignKey('auth.User')
    title = models.CharField(max_length=255, blank=True)
    scripture = models.CharField(max_length=50)
    body = models.TextField(blank=True)
