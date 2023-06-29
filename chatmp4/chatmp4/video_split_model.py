from moviepy.editor import VideoFileClip
import subprocess
import os


'''
file_path, input_file : input 영상 경로
output_file : output 영상 경로
total_time : get_video_duration의 output = 영상 길이
duration : 자를 기간(영상 나눌 단위 (30초 단위))
'''


# 영상 길이 구하기
def get_video_duration(file_path):
    clip = VideoFileClip(file_path)
    total_time = clip.duration
    clip.close()
    return total_time

# 영상 나누기 함수
def split_video(input_file, output_file, total_time, duration):
    intervals = []
    idx = 1
    for i in range(0,int(total_time)+1,duration):
        split_num = str(idx)
        intervals.append((i, output_file+f'/split_{split_num}.mp4'))
        idx += 1
    
    for interval in intervals:
        start_time, output_file = interval
        command = f'ffmpeg -i {input_file} -ss {start_time} -t {duration} -c copy {output_file}'
        subprocess.call(command, shell=True)
        print(f'영상 {i+1} 분할 완료: {output_file}')
