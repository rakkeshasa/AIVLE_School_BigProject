from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.utils import timezone
from home.models import User, Post
import json
import os
from . import video_split_model
from . import stt_model
from . import chat_model
from django.contrib.auth import authenticate, login as auth_login


def test(request) :
    return HttpResponse("hello world")


def post(request) : 
    data = json.loads(request.body)
    print(data['pwd'])
    return HttpResponse("login page")

def login_view(request):
    data = json.loads(request.body)
    if User.objects.filter(email = data['id']).exists():
        getUser = User.objects.get(email = data['id'])
        if getUser.password == data['pwd']:
            request.session['login_user'] = data['id']
            return JsonResponse({'name': getUser.name, 'message': '로그인 성공'})
        else:
            request.session['loginOk'] = False
            context = {
                "result": "아이디 또는 비밀번호가 올바르지 않습니다."
            }
            return JsonResponse({'error': 'wrong_idpw'}, status=400)
    else:
        request.session['loginOk'] = False
        context = {
            "result": "존재하지 않는 id입니다."
        }
    return JsonResponse({'error': '잘못된 요청입니다.'}, status=405)  

# @csrf_exempt
# def login_view(request):
#     data = json.loads(request.body)
#     if User.objects.filter(email = data['id']).exists():
#         username = User.objects.get(email=data['id'])
#         password = data['pwd']
#         user = authenticate(username=username, password=password)
#         if user:
#             if user.is_active:
#                 auth_login(request, user)
#                 return HttpResponseRedirect(request.GET.get('next',
#                                             settings.LOGIN_REDIRECT_URL))
#         else:
#             error = 'Invalid username or password.'

    # if User.objects.filter(email = data['id']).exists():
    #     getUser = User.objects.get(email = data['id'])
    #     if getUser.password == data['pwd']:
    #         request.session['login_user'] = data['id']
    #         return JsonResponse({'name': getUser.name, 'message': '로그인 성공'})
    #     else:
    #         request.session['loginOk'] = False
    #         context = {
    #             "result": "아이디 또는 비밀번호가 올바르지 않습니다."
    #         }
    #         return JsonResponse({'error': 'wrong_idpw'}, status=400)
    # else:
    #     request.session['loginOk'] = False
    #     context = {
    #         "result": "존재하지 않는 id입니다."
    #     }
    # return JsonResponse({'error': '잘못된 요청입니다.'}, status=405)  


# 파일 업로드
@csrf_exempt
def videoUpload(request):
    if request.method == 'POST' and request.FILES['video']:
        uploadFile = request.FILES['video']
        current = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        folder_path = os.path.join(current, 'media/')
        os.makedirs(folder_path, exist_ok=True) # 폴더 생성

        file_path = os.path.join(folder_path, str(uploadFile)) # uploadFile => title
        with open(file_path, 'wb') as destination:
            for chunk in uploadFile.chunks():
                destination.write(chunk)

        print(uploadFile)
        id = request.POST['userId']

        video_title = request.POST['videoTitle']
        video_address = request.POST['videoAddress']
        upload_date = request.POST['uploadDate']
        return HttpResponse('file upload ok')

# 회원가입
@csrf_exempt
def signup(request):
    data = json.loads(request.body)
    if User.objects.filter(email=data['id']).exists():
        context={
            'result': '이미 존재하는 아이디입니다.'
        }
        return HttpResponse('already exists')

    else:
        User.objects.create(
            email = data['id'],
            name = data['name'],
            password = data['pwd'],
        ).save()
        context={
            'result':'signup'
        }
        return HttpResponse('signup')


def video_split(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_fath = os.path.join(current_directory,'test_file','video_file','input','test_input.mp4')
    output_fath = os.path.join(current_directory,'test_file','video_file','output')
    tt = video_split_model.get_video_duration(input_fath)
    video_split_model.split_video(input_fath, output_fath, tt, 30)
    print('split success')
    return HttpResponse("Split Success")

def stt(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    # input_path = os.path.join(current_directory,'test_file','video_file','output','split_1.mp4')
    chatmp4_files = os.listdir(os.path.join(current_directory, 'test_file','video_file','output'))
    for chatmp4_file in chatmp4_files:
        input_path = os.path.join(current_directory,'test_file','video_file','output',chatmp4_file)
        output_name = os.path.splitext(chatmp4_file)[0]
        output_path = os.path.join(current_directory,'test_file','text_file','result',f'{output_name}.txt')
    
        stt_model.STT(input_path,output_path)
    print('stt success')
    return HttpResponse("STT Success")

def chat(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    txt_path = os.path.join(current_directory, 'test_file','text_file','result')
    res = chat_model.chat("", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=2, message='관우는 뭐했어?')
    print('chat success')
    return HttpResponse(res)


# def post(request):
#     postlist = Post.objects.all()
#     return render(request, 'blog.html', {'postlist': postlist})

# def posting(request, pk):
#     post = Post.objects.get(pk=pk)
#     return render(request, 'posting.html', {'post':post})

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

#     return render(request, 'new_post.html')

# def remove_post(request, pk):
#     post = Post.objects.get(pk=pk)
#     if request.method == 'POST':
#         post.delete()
#         return redirect('/blog/')
#     return render(request, 'remove_post.html', {'Post': post})
