from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     pass

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    id2 = models.ForeignKey(User, models.DO_NOTHING, db_column='id2', blank=True, null=True)
    post_title = models.CharField(max_length=50)
    post_date = models.DateTimeField()
    post_text = models.TextField()

    class Meta:
        managed = False
        db_table = 'post'


class Video(models.Model):
    video_id = models.AutoField(primary_key=True)
    id = models.ForeignKey(User, models.DO_NOTHING, db_column='id', blank=True, null=True)
    video_title = models.CharField(max_length=30)
    video_addr = models.CharField(max_length=50)
    upload_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'video'