from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.utils import timezone
from blog.models import Post, Video
from django.contrib.auth.models import User
import json
import os
from . import video_split_model
from . import stt_model
from . import chat_model
from django.contrib.auth import authenticate, login
from datetime import datetime


def test(request) :
    return HttpResponse("hello world")


def post(request) :
    data = json.loads(request.body)
    print(data['pwd'])
    return HttpResponse("login page")

# 로그인
@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    if User.objects.filter(email = data['id']).exists():
        getUser = User.objects.get(email = data['id'])

        if getUser.password == data['pwd']:
            request.session['user'] = data['id'] #유저email
            request.session['username'] = getUser.username # 작성자명
            request.session['user_id'] = getUser.id # 유저ID
            print(getUser.id)
            return JsonResponse({'status': True,
                                 'session_id': request.session.get('user')})
        else:
            return JsonResponse({'status': '아이디 또는 비밀번호가 올바르지 않습니다.'})
    else:
        return JsonResponse({'status': '존재하지 않는 id입니다.'})
    
def logout(request):
    request.session.clear()

    return HttpResponse('logout')
    

def mypage(request): 
    user_id = request.session.get('user')
    getUser = User.objects.filter(email = user_id)
    res = {'id': getUser.email,
           'password': getUser.password,
           'name' : getUser.name}
    print(res)
    return JsonResponse(res)



# 파일 업로드 및 학습
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
        user_id = request.session.get('user_id')
        video_title = request.POST['title']
        user_email = request.session.get('user')

        user = User.objects.get(email=user_email)
        print(user_email)
        print(user.id)

        video = Video(id = user, video_title=video_title, video_addr=file_path, upload_date=datetime.now())
        video.save()

        # 동영상 학습
        current_directory = os.path.dirname(os.path.abspath(__file__))
        input_path = os.path.join(current_directory,'test_file','video_file','input','ttt.mp4') # 비디오 경로 수정
        output_path = os.path.join(current_directory,'test_file','video_file','output')
        tt = video_split_model.get_video_duration(input_path)
        video_split_model.split_video(input_fath, output_path, tt, 30)
        print('split success')

        # stt
        chatmp4_files = os.listdir(os.path.join(current_directory, 'test_file','video_file','output'))
        for chatmp4_file in chatmp4_files:
            input_path = os.path.join(current_directory,'test_file','video_file','output', chatmp4_file)
            output_name = os.path.splitext(chatmp4_file)[0]
            output_path = os.path.join(current_directory,'test_file','text_file','result',f'{output_name}.txt')
    
            stt_model.STT(input_path,output_path)
        print('stt success')  
        
        return HttpResponse('file upload ok')

# 회원가입
@csrf_exempt
def signup(request):
    data = json.loads(request.body)
    print(data)
    if User.objects.filter(email=data['id']).exists():
        context={
            'result': '이미 존재하는 아이디입니다.'
        }
        return HttpResponse(False)

    else:
        User.objects.create(
            email = data['id'],
            username = data['name'],
            password = data['pwd'],
        ).save()
        context={
            'result':'signup'
        }
        return HttpResponse(True)


def video_split(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    input_fath = os.path.join(current_directory,'test_file','video_file','input','test_input.mp4')
    output_fath = os.path.join(current_directory,'test_file','video_file','output')
    tt = video_split_model.get_video_duration(input_fath)
    video_split_model.split_video(input_fath, output_fath, tt, 30)
    print('split success')
    return HttpResponse("Split Success")

@csrf_exempt
def video2chat(request):
    #응답 받기
    data = json.loads(request.body)
    print(data)

    # video split
    current_directory = os.path.dirname(os.path.abspath(__file__))


    q = str(data['question'])
    txt_path = os.path.join(current_directory, 'test_file','text_file','result')
    res = chat_model.chat("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", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=1, message=q)
    print('chat success')
    # return JsonResponse({'result': res, 'message': '답변 성공'})
    return HttpResponse(res)
