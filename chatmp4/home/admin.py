from django.contrib import admin
from .models import User, Video, Post
from . import models

admin.site.register(User)
admin.site.register(Video)
admin.site.register(Post)