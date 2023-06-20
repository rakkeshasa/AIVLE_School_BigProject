from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'blog'
urlpatterns = [
    path("", views.post),
    path('<int:pk>/', views.posting, name="posting"),
    # path('', views.index, name='index'),
]