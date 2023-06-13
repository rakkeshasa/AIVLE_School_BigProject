from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models

class User(AbstractUser):
    # 풀네임 필드(null값 허용 안함, 빈 칸 허용 안함)
    name = models.CharField(max_length=20, null=False, blank=False)
    
class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_title = models.CharField(max_length=30)
    post_date = models.DateField()
    post_text = models.TextField()

    def __str__(self):
        return self.post_title
    
class Video(models.Model):
    video_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_title = models.CharField(max_length=30)
    video_addr = models.CharField(max_length=50)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.video_title