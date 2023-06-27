from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name='index.html'),name='index'),
    # path("login", views.login),
    # path("post", views.login_view),
    path("video", views.videoUpload),
    # path("blog/", views.post),
    # path('blog/<int:pk>/', views.posting, name="posting"),
    path('blog/',include('blog.urls')),
    path("video_split", views.video_split, name='video_split'),
    path("stt", views.stt, name='stt'),
    # path("chat", views.chat, name='chat'),
    path("video2chat", views.video2chat, name='v2c'),
    path("login", views.login_view),
    path("join", views.signup),
    path('test', views.test),
    path('logout', views.logout),
]
