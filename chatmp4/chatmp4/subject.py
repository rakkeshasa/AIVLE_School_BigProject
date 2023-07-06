from google.cloud import language_v1
from google.cloud import translate_v2 as translate
import os

def text_combine(input, output):
    file_list = os.listdir(input)

    txt_lst = []

    for file in file_list:
        with open(os.path.join(input, file), 'r', encoding='utf-8') as f:
            txt_lst.append(f.read())
            # print(file)

    with open(output, 'w', encoding='utf-8') as file:
        for line in txt_lst:
            file.write(line + '\n')

def text_subject():
    # 인증 정보를 포함한 키 파일의 경로를 지정합니다.
    key_path = ''#google 키 경로

    # 번역 클라이언트를 인스턴스화합니다.
    translate_client = translate.Client.from_service_account_json(key_path)
    # txt 파일 경로 지정
    file_path = '/content/total.txt'

    # txt 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
        
    # 텍스트를 영어로 번역합니다.
    translation = translate_client.translate(text, target_language='en')
    translated_text = translation['translatedText']
    
    # 주제 분류 클라이언트를 인스턴스화합니다.
    language_client = language_v1.LanguageServiceClient.from_service_account_json(key_path)
    
    # 주제 분류 요청을 생성합니다.
    document = language_v1.Document(content=translated_text, type_=language_v1.Document.Type.PLAIN_TEXT)

    # 주제 분류를 수행하고 결과를 받아옵니다.
    response = language_client.classify_text(request={'document': document})

    # 결과 출력
    for category in response.categories:
        print("주제: {}".format(category.name))
        print("신뢰도: {}".format(category.confidence))

current_directory = os.path.dirname(os.path.abspath(__file__))
input = os.path.join(current_directory, 'test_file','text_file','result')
output = os.path.join(current_directory, 'test_file','text_file','combine','total.txt')

text_combine(input, output)