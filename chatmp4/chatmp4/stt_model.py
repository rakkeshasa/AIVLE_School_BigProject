import os
import openai
import requests

def STT(audio_path, output_path):
    # 키 인증
    openai.api_key = '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'
    
    f = open(audio_path, "rb")
    transcript = openai.Audio.transcribe("whisper-1", f)
    
    # 파일 열기
    with open(output_path, "w", encoding="utf-8") as file:
        # 파일에 내용 쓰기
        file.write(transcript['text'])