from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'blog'
urlpatterns = [
    path("", views.post),
    path('<int:pk>/', views.posting, name="posting"),
    path('new_post/', views.new_post),
    path('<int:pk>/remove', views.remove_post),
    path('remove_post', views.remove_post),
    path('ck', views.chk),
    path('get_post', views.get_post),
    path('create_post', views.create_post),
    path('delete_post/<int:postId>/', views.delete_post),
]