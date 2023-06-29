from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'blog'
urlpatterns = [
    path("", views.post),
    path('<int:pk>/', views.posting, name="posting"),
    path('new_post/', views.new_post),
    path('<int:pk>/remove', views.remove_post),
]