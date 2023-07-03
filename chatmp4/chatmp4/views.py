from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from blog.models import Post, User, Video
# from django.contrib.auth.models import User
import json
import os
from . import video_split_model
from . import stt_model
from . import chat_model
from django.contrib.auth import authenticate, login


def test(request) :
    return HttpResponse("hello world")


def post(request) :
    data = json.loads(request.body)
    print(data['pwd'])
    return HttpResponse("login page")

# @csrf_exempt
# def login_view(request):
#     data = json.loads(request.body)
#     if User.objects.filter(username = data['id']).exists():
#         print(User.objects.get(username = data['id']),data['id'])
#         print(User.objects.get(password = data['pwd']),data['pwd'])
#         user = authenticate(request, username=data['id'], password=data['pwd'])
#         # user = data['id']
#         print(user)
#         getUser = User.objects.get(username = data['id'])
#         if user is not None:
#             login(request, username=data['id'], password=data['pwd'])
#             request.session['login_user'] = data['id']
#             return JsonResponse({'name': user.username, 'message': '로그인 성공'})
#         else:
#             context = {
#                 "result": "아이디 또는 비밀번호가 올바르지 않습니다."
#             }
#             return JsonResponse({'error': 'wrong_idpw'}, status=400)
#     else:
#         context = {
#             "result": "존재하지 않는 이메일입니다."
#         }
#         return JsonResponse({'error': '잘못된 요청입니다.'}, status=405)

@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    if User.objects.filter(email = data['id']).exists():
        # login(request, username=data['id'], password=data['pwd'])
        # user = authenticate(request, username=data['id'], password=data['pwd'])
        getUser = User.objects.get(email = data['id'])
 
        if getUser.password == data['pwd']:
            request.session['user'] = data['id']
            request.session['user_id'] = getUser.id
            
            return JsonResponse({'status': True,
                                 'session_id': request.session.get('user')})
        else:
            # request.session['loginOk'] = False
            # context = {
            #     "result": "아이디 또는 비밀번호가 올바르지 않습니다."
            # }
            # return JsonResponse({'error': 'wrong_idpw'}, status=400)
            return JsonResponse({'status': '아이디 또는 비밀번호가 올바르지 않습니다.'})
    else:
    #     request.session['loginOk'] = False
    #     context = {
    #         "result": "존재하지 않는 id입니다."
    #     }
    # return JsonResponse({'error': '잘못된 요청입니다.'}, status=405)  
        return JsonResponse({'status': '존재하지 않는 id입니다.'})
    
def logout(request):
    request.session.clear()

    return HttpResponse('logout')

def test(request): 
    user_id = request.session.get('user')
    print(user_id)
    if user_id : 
        return HttpResponse('hello')
    else :
        return HttpResponse('ㅠㅠ')
    

def mypage(request): 
    user_id = request.session.get('user')
    getUser = User.objects.get(email = user_id)
    res = {'id' : getUser.email,
           'password': getUser.password,
           'name': getUser.username}
    print(res)
    return JsonResponse(res)

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
        # id = request.POST['userId']

        # video_title = request.POST['videoTitle']
        # video_address = request.POST['videoAddress']
        # upload_date = request.POST['uploadDate']

        # 동영상 학습
        current_directory = os.path.dirname(os.path.abspath(__file__))
        input_fath = os.path.join(current_directory,'test_file','video_file','input','ttt.mp4') # 비디오 경로 수정
        output_fath = os.path.join(current_directory,'test_file','video_file','output')
        tt = video_split_model.get_video_duration(input_fath)
        video_split_model.split_video(input_fath, output_fath, tt, 30)
        print('split success')

        # stt
        chatmp4_files = os.listdir(os.path.join(current_directory, 'test_file','video_file','output'))
        for chatmp4_file in chatmp4_files:
            input_path = os.path.join(current_directory,'test_file','video_file','output',chatmp4_file)
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
    res = chat_model.chat("", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=1, message='발화자는 무슨 이야기 중이야?')
    print('chat success')
    return HttpResponse(res)


# @csrf_exempt
# def video2chat(request):
#     #응답 받기
#     data = json.loads(request.body)
#     print(data)

#     # video split
#     current_directory = os.path.dirname(os.path.abspath(__file__))
#     # input_fath = os.path.join(current_directory,'test_file','video_file','input','ttt.mp4') # 비디오 경로 수정
#     # output_fath = os.path.join(current_directory,'test_file','video_file','output')
#     # tt = video_split_model.get_video_duration(input_fath)
#     # video_split_model.split_video(input_fath, output_fath, tt, 30)
#     # print('split success')

#     # # stt
#     # chatmp4_files = os.listdir(os.path.join(current_directory, 'test_file','video_file','output'))
#     # for chatmp4_file in chatmp4_files:
#     #     input_path = os.path.join(current_directory,'test_file','video_file','output',chatmp4_file)
#     #     output_name = os.path.splitext(chatmp4_file)[0]
#     #     output_path = os.path.join(current_directory,'test_file','text_file','result',f'{output_name}.txt')
   
#     #     stt_model.STT(input_path,output_path)
#     # print('stt success')  

#     q = str(data['question'])
#     txt_path = os.path.join(current_directory, 'test_file','text_file','result')
#     res = chat_model.chat("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", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=1, message=q)
#     print('chat success')
#     # return JsonResponse({'result': res, 'message': '답변 성공'})
#     return HttpResponse(res)

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

def getLog(request):
    user_id = request.session.get('user_id')
    print(user_id)
    videoList = Video.objects.filter(id = user_id)
    title = [video.video_title for video in videoList]
    category = [video.category for video in videoList]
    data = {'id' : user_id,
            'title': title,
            'category': category}
    return JsonResponse(data)


def getChat(request):
    user_id = request.session.get('user_id')
    idx = request.GET.get('idx', None)
    idx = int(idx)
    if user_id is not None and idx is not None:
        videos = Video.objects.filter(id=user_id)
        if videos.exists() and idx < len(videos):
            video = videos[idx]
            answer = video.answer.split('/')
            question = video.question.split('/')
            response = {
                'answer': answer,
                'question': question
            }
            return JsonResponse(response)
    
    return HttpResponse('데이터 없음')

# @csrf_exempt
# def video2chat(request):
#     #응답 받기
#     video_id = request.session.get('uploaded_video_id')
#     print(video_id)
#     data = json.loads(request.body)
#     video_id = request.session.get('uploaded_video_id')
#     print(video_id)
#     # video split
#     current_directory = os.path.dirname(os.path.abspath(__file__))
#     print(current_directory)
#     q = str(data['question'])
#     txt_path = os.path.join(current_directory, 'test_file','text_file','result')
#     res = chat_model.chat("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", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=1, message=q)
#     print('chat success')
#     # return JsonResponse({'result': res, 'message': '답변 성공'})
#     # db에 question , answer 에 / 붙여서 넣기
#     q = q + "/"
#     db_qa = Video.objects.get(video_id = video_id)
#     load_q = db_qa.question
#     q = load_q + q
#     ans = str(res) + "/"
#     load_a = db_qa.answer
#     ans = load_a + ans
#     video = get_object_or_404(Video, video_id=video_id)
#     video.question = q
#     video.answer = ans
#     video.save()
#     return HttpResponse(res)

@csrf_exempt
def video2chat(request):
    #응답 받기
    data = json.loads(request.body)
    video_id = request.session.get('uploaded_video_id')
    print(video_id)
    # video split
    current_directory = os.path.dirname(os.path.abspath(__file__))
    print(current_directory)
    q = str(data['question'])
    txt_path = os.path.join(current_directory, 'test_file','text_file','result')
    res, output_video = chat_model.chat("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", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=1, message=q)
    print('chat success')
    # return JsonResponse({'result': res, 'message': '답변 성공'})
    # return HttpResponse(res)
    # db에 question , answer 에 / 붙여서 넣기
    q = q + "/"
    db_qa = Video.objects.get(video_id = video_id)
    load_q = db_qa.question
    if load_q == None:
        q = q
    else:
        q = str(load_q) + q
    ans = str(res) + "/"
    load_a = db_qa.answer
    if load_a == None:
        ans = ans
    else:
        ans = str(load_a) + ans
    video = get_object_or_404(Video, video_id=video_id)
    video.question = q
    video.answer = ans
    video.save()

    return HttpResponse(res)