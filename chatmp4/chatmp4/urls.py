from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name='index.html'),name='index'),
    path("login", views.login),
    path("post", views.signup),
    path("video", views.videoUpload),
    path("post", views.signup),
    path("blog/", views.post),
    path('blog/<int:pk>/', views.posting, name="posting"),
]
