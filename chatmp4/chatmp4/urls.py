from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name='index.html'),name='index'),
    path("video", views.videoUpload),
    path("blog/",include("blog.urls")),
    path("video2chat", views.video2chat, name='v2c'),
    path("login", views.login_view),
    path("join", views.signup),
    path('test', views.test),
    path('logout', views.logout),
    path('mypageinfo', views.mypage),
    path('board/', TemplateView.as_view(template_name='index.html')),
    path('getLog', views.getLog),
    path('getChat/', views.getChat, name='getChat'),
    path('getCategory', views.getCategory, name='getCategory')
]
