from django.shortcuts import render
from .models import Post
# Create your views here.

def post(request):
    postlist = Post.objects.all()
    return render(request, 'blog.html', {'postlist': postlist})

def posting(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'posting.html', {'post':post})
