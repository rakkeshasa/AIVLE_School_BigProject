import os
from langchain.llms import OpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain import OpenAI, PromptTemplate, LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document

def sum_func(api_key, txt_dir):

    os.environ["OPENAI_API_KEY"] = api_key

    llm = OpenAI(temperature=0.4) # 낮을수록 문장에서 큰 변화 없음

    text_splitter = CharacterTextSplitter()

    with open(txt_dir, 'r', encoding='utf-8') as file:
        state_of_the_union = file.read()
    texts = text_splitter.split_text(state_of_the_union)


    docs = [Document(page_content=t) for t in texts[:3]]


    chain = load_summarize_chain(llm, chain_type="map_reduce")
    summary = chain.run(docs)
    print(summary)
    
    return summary

