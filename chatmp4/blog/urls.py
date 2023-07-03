from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'blog'
urlpatterns = [
    path('get_post/', views.get_post),
    path('create_post', views.create_post),
    path('delete_post/<int:postId>/', views.delete_post),
]