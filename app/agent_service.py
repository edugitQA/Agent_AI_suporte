import os
from dotenv import load_dotenv
from langchain.document_loaders import TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

load_dotenv()

def carregar_agente():
    #carrega os documentos
    loader = TextLoader("app/knowledge/base.md")
    documents = loader.load()

    #criar embeddings e vetorizar os docs
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(documents, embeddings)
    retriever = vectorstore.as_retriever()

    #configurar a LLM no caso estou usando OPENAI
    llm = ChatOpenAI(temperature=0.3, model_name="gpt-4.1-mini")

    #criar uma cadeia de QA usando langchain
    agente = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return agente
