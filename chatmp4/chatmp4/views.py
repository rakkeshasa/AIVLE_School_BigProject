from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.utils import timezone
from home.models import User, Post
import json
import os
from . import video_split_model
from . import stt_model
from . import chat_model


def test(request) :
    return HttpResponse("hello world")


@csrf_exempt
def post(request) : 
    data = json.loads(request.body)
    print(data['pwd'])
    return HttpResponse("login page")

def login_view(request):
    data = json.loads(request.body)
    if User.objects.filter(email = data['id']).exists():
        getUser = User.objects.get(email = data['id'])
        if getUser.password == data['pwd']:
            request.session['loginOk'] = True
            context = {
            "result": "로그인 성공"
            }
            return JsonResponse({'message': '로그인 성공'})
        else:
            request.session['loginOk'] = False
            context = {
                "result": "아이디 또는 비밀번호가 올바르지 않습니다."
            }
            return JsonResponse({'error': 'wrong'}, status=400)
    else:
        request.session['loginOk'] = False
        context = {
            "result": "존재하지 않는 id입니다."
        }
    return JsonResponse({'error': '잘못된 요청입니다.'}, status=405)  

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

def test(request) : 
    return HttpResponse("Hello world")

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
    res = chat_model.chat("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", isfirst=False, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=2, message='관우는 뭐했어?')
    print('chat success')
    return HttpResponse(res)
