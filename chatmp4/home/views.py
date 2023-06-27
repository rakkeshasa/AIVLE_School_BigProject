from django.shortcuts import render
from django.http import HttpResponse
from . import video_split_model
from . import stt_model
import os

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
    input_path = os.path.join(current_directory,'test_file','video_file','output','split_1.mp4')
    output_path = os.path.join(current_directory,'test_file','text_file','result','text_1.txt')
    stt_model.STT(input_path,output_path)
    print('stt success')
    return HttpResponse("STT Success")