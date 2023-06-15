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
            return HttpResponse("login")
        else:
            return HttpResponse("failed")
            