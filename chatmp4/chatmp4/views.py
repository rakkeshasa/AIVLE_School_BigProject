import shutil
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from blog.models import Post, Video
from django.contrib.auth.models import User
import json
import os
from . import video_split_model, subject, stt_model, chat_model, summary
from django.contrib.auth import authenticate, login
from google.cloud import language_v1, translate_v2
from datetime import datetime
from django.core.serializers import serialize
from kobart.test_model import summary_kobart
from django.db.models import Count

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
            request.session['user'] = data['id']
            request.session['username'] = getUser.username # 작성자명
            request.session['user_id'] = getUser.id # 유저ID
            request.session['id2'] = getUser.id
            return JsonResponse({
                'status': True,
                'session_id': request.session.get('user'),
                'id2': request.session.get('id2')
            })
        else:
            return JsonResponse({'status': '아이디 또는 비밀번호가 올바르지 않습니다.'})
    else:
        return JsonResponse({'status': '존재하지 않는 id입니다.'})
    
def logout(request):
    request.session.clear()

    return HttpResponse('logout')
    

def mypage(request): 
    user_id = request.session.get('user')
    getUser = User.objects.get(email = user_id)
    res = {'id' : getUser.email,
           'password': getUser.password,
           'name': getUser.username}
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

        # 비디오 모델 생성
        user_id = request.session.get('user_id')
        video_title = str(uploadFile)[:3]
        user_email = request.session.get('user')
        user = User.objects.get(email=user_email)

        # video_file, result 폴더 내 파일 삭제
        current_directory = os.path.dirname(os.path.abspath(__file__)) 
        video_directory = os.path.join(current_directory,'..','client','static','videos','output')
        text_directory = os.path.join(current_directory, 'test_file', 'text_file', 'result')
        
        # 디렉토리 내의 모든 파일 삭제
        for filename in os.listdir(video_directory):
            remove_path = os.path.join(video_directory, filename)
            if os.path.isfile(remove_path):
                print(remove_path)
                os.remove(remove_path)
                
        # 디렉토리 내의 모든 파일 삭제
        for filename in os.listdir(text_directory):
            remove_path = os.path.join(text_directory, filename)
            if os.path.isfile(remove_path):
                os.remove(remove_path)

        # 동영상 학습
        input_path = os.path.join(file_path) # 비디오 경로 수정
        output_path = os.path.join(current_directory,'..','client','static','videos','output')
        tt = video_split_model.get_video_duration(input_path)
        video_split_model.split_video(input_path, output_path, tt, 80)
        print('split success')

        # stt
        chatmp4_files = os.listdir(os.path.join(current_directory,'..','client','static','videos','output'))
        for chatmp4_file in chatmp4_files:
            input_path = os.path.join(current_directory,'..','client','static','videos','output', chatmp4_file)
            output_name = os.path.splitext(chatmp4_file)[0]
            output_path = os.path.join(current_directory,'test_file','text_file','result',f'{output_name}.txt')

            stt_model.STT(input_path,output_path)
        print('stt success')

        # summary
        list_dir = os.path.join(current_directory, 'test_file', 'text_file', 'result') # 텍스트들 받아옴
        text_lst = os.listdir(os.path.join(current_directory, 'test_file', 'text_file', 'result')) # 텍스트 파일 제목
        summary_lst = []
        for text in text_lst:
            txt = ''
            with open(os.path.join(list_dir,text),'r', encoding='utf-8') as f:
                txt = f.read()
                sm_txt = summary_kobart(txt)
                summary_lst.append(sm_txt)
                st = ''.join(summary_lst)

        print(st)
        print("$$$$$$$$$$$$$$$$$$$$$$$$$$$4")
        # 번역 기능
        translate_client = translate_v2.Client()
        translation_s = translate_client.translate(st, target_language='ko')
        st = translation_s['translatedText']
        print(st)

        # st = ''.join(summary_lst)
        # print(st)
        # total_summary = summary_kobart(st)
        # print(total_summary)

        # translation_s = translate_client.translate(total_summary, target_language='ko') #텍스트 한국어로 번역
        # translated_text_s = translation['translation_s']
        # print(translated_text_s)

        # category
        current_directory = os.path.dirname(os.path.abspath(__file__))
        input = os.path.join(current_directory, 'test_file','text_file','result')
        output = os.path.join(current_directory, 'test_file','text_file','combine','temp.txt')

        subject.text_combine(input, output)

        # 번역 클라이언트를 인스턴스화
        # translate_client = translate_v2.Client()
        file_path = os.path.join(current_directory, 'test_file','text_file','combine','temp.txt') # txt 경로
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()

        translation = translate_client.translate(text, target_language='en') #텍스트 영어로 번역
        translated_text = translation['translatedText']

        # 주제 분류
        language_client = language_v1.LanguageServiceClient()
        document = language_v1.Document(content=translated_text, type_=language_v1.Document.Type.PLAIN_TEXT)
        response = language_client.classify_text(request={'document': document}) # 결과

        if response.categories: 
            first_category = response.categories[0] 
            result = { 
                    'name': first_category.name, 
                    'confidence': first_category.confidence 
                    } 
        else: result = { 
                        'name': 'No category found', 
                        'confidence': 0.0 } 
        
        name = result['name']
        last_name = name.split('/')[-1]
        
        video = Video(id = user, video_title=video_title, video_addr=file_path, upload_date=datetime.now(), category = last_name)
        video.save()

        request.session.pop('uploaded_video_id', None)
        request.session['uploaded_video_id'] = video.video_id
        
        db_directory = os.path.join(current_directory,'db')

        print('$##############삭제')
        if os.path.exists(db_directory):
            print('$##############됐다')
            shutil.rmtree(db_directory)

        response = {
            'summary' : st
        }
        return JsonResponse(response)

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


def getCategory(request):
    user_id = request.session.get('user_id')

    # 개인 카테고리
    video_statistics = (
        Video.objects.filter(id=user_id)
        .values('category')
        .annotate(category_count=Count('category'))
        .order_by('-category_count') #큰 순으로
    )

    categories = [item['category'] for item in video_statistics]
    counts = [item['category_count'] for item in video_statistics]
    print(categories, counts)


    # 전체 카테고리
    most_common_category = (
        Video.objects.values('category')
        .annotate(category_count=Count('category'))
        .order_by('-category_count')
    )

    if most_common_category:
        category = [item['category'] for item in most_common_category]
        category_count = [item['category_count'] for item in most_common_category]
    else:
        category = None
        category_count = 0

    print(category, category_count)

    data = {
        'user_id': user_id,
        'categories': categories,
        'counts': counts,
        'total_categories': category,
        'total_counts': category_count
    }
    return JsonResponse(data)


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
    res, output_video = chat_model.chat("", isfirst=True, input_dir=txt_path, vectordb_dir=os.path.join(current_directory, 'db'), n=2, message=q)

    print('chat success')
    # return JsonResponse({'result': res, 'message': '답변 성공'})
    # return HttpResponse(res)
    # db에 question , answer 에 / 붙여서 넣기
    
    if output_video :
        if '보여줘' in q:
            videoResult = output_video[0]
        else : videoResult = ''

    print(videoResult)


    db_qa = Video.objects.get(video_id = video_id)
    load_q = db_qa.question

    if load_q == None:
        q = q
    else:
        q = str(load_q) + "/" + q

    ans = str(res)
    load_a = db_qa.answer
    if load_a == None:
        ans = ans
    else:
        ans = str(load_a) + "/" + ans
    video = get_object_or_404(Video, video_id=video_id)
    video.question = q
    video.answer = ans
    video.save()

    # 번역 기능
    translate_client = translate_v2.Client()
    translation_r = translate_client.translate(res, target_language='ko')
    res = translation_r['translatedText']
    print(res)
    
    response = {
        'answer': res,
        'video' : videoResult,  
    }

    return JsonResponse(response)
