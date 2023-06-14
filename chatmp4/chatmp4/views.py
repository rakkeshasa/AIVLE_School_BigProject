from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

def test(request) : 
    return HttpResponse("hello world")

@csrf_exempt
def post(request) : 
    data = json.loads(request.body)
    print(data)
    return HttpResponse("hello world")