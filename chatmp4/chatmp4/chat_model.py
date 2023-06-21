from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.document_loaders import DirectoryLoader

import os
import openai

'''
api_key : 사용 할 api key
isfirst : 처음 만드는 자료인지 확인용 처음 만드는게 아니면 vectordb에 저장되어 있어서 그거 쓰면 됨
input_dir : 처음 만들때 사용하는 input 경로
vectordb_dir : vector db 경로
n : 관련있는 몇개의 문서를 찾을 지 정해줌 (이게 크면 token 초과 걸려서 텍스트 양 보고 조절 해서 써야함)
message : 질문을 작성
'''

def chat(api_key, isfirst, input_dir, vectordb_dir, n, message):
    os.environ["OPENAI_API_KEY"] = api_key
    
    # 처음 만드는 경우 텍스트를 vectordb에 저장해야함
    if isfirst==True:
        txt_path = input_dir

        loader = DirectoryLoader(txt_path, glob="*.txt", loader_cls=TextLoader, loader_kwargs={"encoding": "utf-8"})

        # 문서들 저장
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)

        persist_directory = vectordb_dir

        embedding = OpenAIEmbeddings() # 임베딩 방법 중 하나

        vectordb = Chroma.from_documents(
            documents=texts,
            embedding=embedding,
            persist_directory=persist_directory)

        vectordb.persist()
        vectordb = None

    persist_directory = vectordb_dir
    embedding = OpenAIEmbeddings() # 임베딩 방법 중 하나
    # DB가 다 만들어진 다음에는 이 코드만 실행
    vectordb = Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding)
    
    # 연관있는 n개 반환
    retriever = vectordb.as_retriever(search_kwargs={"k": n})

    qa_chain = RetrievalQA.from_chain_type(
        llm=OpenAI(),
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True)

    def process_llm_response(llm_response):
        print(llm_response['result'])
        print('\n\nSources:')
        for source in llm_response["source_documents"]:
            print(source.metadata['source'])
        return llm_response['result']


    # 벡터 db에서 찾아서 답변함
    query = message
    llm_response = qa_chain(query)
    process_llm_response(llm_response)
    return process_llm_response(llm_response)

