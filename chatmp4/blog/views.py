from django.shortcuts import render
from .models import Post
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# 파일 업로드
from django.core.files.storage import FileSystemStorage
import os

def post(request):
    postlist = Post.objects.all()
    return render(request, 'blog.html', {'postlist': postlist})

def posting(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'posting.html', {'post':post})


def get_post(request):
    posts = Post.objects.all().values("post_id", "id2", "post_title", "post_text")
    data = list(posts)
    transformed_data = [
        {"id": item["post_id"], "name": item["id2"], "title": item["post_title"], "text": item["post_text"]}
        for item in data
    ]
    return JsonResponse(transformed_data, safe=False)

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

        # 미디어 (DB에 저장 안한다는 가정)
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage(os.path.join(os.path.dirname(os.path.abspath(__file__)),'media'))
        filename = f"{post.post_id}_{uploaded_file.name}"
        fs.save(filename, uploaded_file)

        # post_files 가져오기
        post_files = []
        media_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media')
        if os.path.exists(media_root):
            for file_name in os.listdir(media_root):
                if file_name.startswith(f"{post.post_id}_"):
                    post_files.append(file_name)
        print(post,post_files)

        context = {
            'post': post,
            'post_files': post_files,
        }
        return render(request, 'posting.html', context)

    return render(request, 'new_post.html')

def remove_post(request, pk):
    post = Post.objects.get(pk=pk)
    if request.method == 'POST':
        post.delete()
        return JsonResponse({'message': '글이 삭제되었습니다.'})
    else :
        return JsonResponse({'error': '글을 찾을 수 없습니다.'})