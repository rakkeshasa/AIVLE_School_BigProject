from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from home.models import User
import json

def test(request) : 
    return HttpResponse("hello world")

@csrf_exempt
def post(request) : 
    data = json.loads(request.body)
    print(data['pwd'])
    return HttpResponse("login page")

@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    if User.objects.filter(email = data['id']).exists():
        getUser = User.objects.get(email = data['id'])
        if getUser.password == data['pwd']:
            request.session['loginOk'] = True
            context = {
            "result": "로그인 성공"
            }
            return HttpResponse('login')
        else:
            request.session['loginOk'] = False
            context = {
                "result": "비밀번호가 맞지 않습니다."
            }
            return HttpResponse('wrong pwd')
    else:
        request.session['loginOk'] = False
        context = {
            "result": "존재하지 않는 id입니다."
        }
    return HttpResponse('failed')
  
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