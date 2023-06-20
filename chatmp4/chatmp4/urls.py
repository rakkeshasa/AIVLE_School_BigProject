from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name='index.html'),name='index'),
    path("test", views.test),
    path("post", views.login_view),
    path("blog/", views.post),
    path('blog/<int:pk>/', views.posting, name="posting"),
    path('blog/new_post/', views.new_post),
    path('blog/<int:pk>/remove', views.remove_post),
]
