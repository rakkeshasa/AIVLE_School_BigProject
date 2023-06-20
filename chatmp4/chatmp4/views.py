from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.utils import timezone
from home.models import User, Post
import json
import os


def test(request) :
    return HttpResponse("hello world")


@csrf_exempt
def login(request) :
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        id = data.get('id')
        name = data.get('name')
        pwd = data.get('pwd')
        print(id, pwd)

        try:
            user = User.objects.get(email=id)
            if user.password == pwd:
                return HttpResponse("Login sucess")
            else:
                return HttpResponse("Invalid credentials")
        except User.DoesNotExist:
            return HttpResponse("User does not exist")

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
