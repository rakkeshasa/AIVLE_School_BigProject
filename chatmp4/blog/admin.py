from django.contrib import admin
from . import models

# # Register your models here.
# from django.contrib.admin.models import LogEntry

# class CustomLogEntry(LogEntry):
#     user = models.ForeignKey(models.User, on_delete=models.CASCADE)  # User 모델로 변경해야 합니다.

#     class Meta:
#         proxy = True

# admin.site.unregister(LogEntry)
# admin.site.register(CustomLogEntry, admin.ModelAdmin)
admin.site.register(models.Post)
admin.site.register(models.Video)
