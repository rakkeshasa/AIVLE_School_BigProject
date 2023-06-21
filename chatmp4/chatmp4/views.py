from django.http import HttpResponse
from . import video_split_model
from . import stt_model
from . import chat_model
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