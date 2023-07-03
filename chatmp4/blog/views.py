from django.shortcuts import render
from .models import Post
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404

# 파일 업로드
from django.core.files.storage import FileSystemStorage
import os, json



# @csrf_exempt  
# def new_post(request):
#     if(request.method == 'POST'):
#         post = Post()
#         if request.user.is_authenticated:
#             post.id2 = request.user
#         post.post_title = request.POST['postname']
#         post.post_text = request.POST['contents']
#         post.post_date = timezone.now()
#         post.save()

#         # 미디어 (DB에 저장 안한다는 가정)
#         uploaded_file = request.FILES['file']
#         fs = FileSystemStorage(os.path.join(os.path.dirname(os.path.abspath(__file__)),'media'))
#         filename = f"{post.post_id}_{uploaded_file.name}"
#         fs.save(filename, uploaded_file)

#         # post_files 가져오기
#         post_files = []
#         media_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media')
#         if os.path.exists(media_root):
#             for file_name in os.listdir(media_root):
#                 if file_name.startswith(f"{post.post_id}_"):
#                     post_files.append(file_name)
#         print(post,post_files)

#         context = {
#             'post': post,
#             'post_files': post_files,
#         }
#         return render(request, 'posting.html', context)

#     return render(request, 'new_post.html')

# def remove_post(request, pk):
#     post = Post.objects.get(pk=pk)
#     if request.method == 'POST':
#         post.delete()
#         return redirect('/blog/')
#     return render(request, 'remove_post.html', {'Post': post})

@csrf_exempt
def get_post(request):
    posts = Post.objects.all().values("post_id", "id2", "post_title", "post_text", "post_writer")
    data = list(posts)
    transformed_data = [
        {"id": item["post_id"], "name": item["id2"], "title": item["post_title"], "text": item["post_text"], "writer": item["post_writer"]}
        for item in data
    ]   
    return JsonResponse(transformed_data, safe=False)

@csrf_exempt
def create_post(request):
    data = json.loads(request.body)
    post_id2 = data['id2']
    post_title = data['title']
    post_text = data['text']
    
    try:
        user = User.objects.get(id=post_id2)  # 해당 id2 값을 가진 사용자의 User 인스턴스를 가져옵니다.
    except User.DoesNotExist:
        return JsonResponse({'status': '존재하지 않는 사용자입니다.'})
    
    post = Post(id2=user, post_title=post_title, post_text=post_text)  # User 인스턴스를 할당하여 게시물을 생성합니다.
    post.save()
    
    context = {
        'id2': post.id2.id,
        'title': post.post_title,
        'text': post.post_text,
    }
    return JsonResponse(context)

@csrf_exempt
def delete_post(request, postId):
    data = json.loads(request.body)
    postId = data['postId']
    
    try:
        post = Post.objects.get(post_id=postId)  # 해당 id2 값을 가진 사용자의 User 인스턴스를 가져옵니다.
    except User.DoesNotExist:
        return JsonResponse({'status': '존재하지 않는 사용자입니다.'})
    
    # 게시물 삭제
    post.delete()
    
    # 응답 데이터
    response_data = {
        'message': '게시물이 삭제되었습니다.'
    }
    
    return JsonResponse(response_data)
