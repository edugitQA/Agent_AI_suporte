import os
import glob
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
from app.config import OPEN_API_KEY, MODEL_NAME, TEMPERATURE 
from langchain.document_loaders import TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA


def carregar_agente():
    # Carregar arquivos manualmente
    documentos = []
    arquivos_md = glob.glob("app/knowledge/**/*.md", recursive=True)
    
    if not arquivos_md:
        raise ValueError("Nenhum arquivo .md encontrado em app/knowledge")
    
    for arquivo in arquivos_md:
        loader = TextLoader(arquivo)
        docs = loader.load()
        documentos.extend(docs)
    
    print(f"Carregados {len(documentos)} documentos")

    # Criar embeddings e vetorizar os docs
    embeddings = OpenAIEmbeddings(openai_api_key=OPEN_API_KEY)
    vectorstore = FAISS.from_documents(documentos, embeddings)
    retriever = vectorstore.as_retriever()

    # Configurar a LLM
    llm = ChatOpenAI(
        openai_api_key=OPEN_API_KEY,
        model_name=MODEL_NAME,
        temperature=TEMPERATURE
    )

    # Criar o agente
    agente = RetrievalQA.from_chain_type(
        llm=llm, 
        retriever=retriever,
        return_source_documents=True
    )
    
    return agente