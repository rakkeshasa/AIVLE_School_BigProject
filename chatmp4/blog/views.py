from django.shortcuts import render
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
# Create your views here.

def post(request):
    postlist = Post.objects.all()
    return render(request, 'blog.html', {'postlist': postlist})

def posting(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'posting.html', {'post':post})

@csrf_exempt  
def new_post(request):
    if(request.method == 'POST'):
        post = Post()
        if request.user.is_authenticated:
            post.id2 = request.user
        post.post_title = request.POST['postname']
        post.post_text = request.POST['contents']
        post.post_date = timezone.now()
        post.save()
    return render(request, 'new_post.html')

def remove_post(request, pk):
    post = Post.objects.get(pk=pk)
    if request.method == 'POST':
        post.delete()
        return redirect('/blog/')
    return render(request, 'remove_post.html', {'Post': post})