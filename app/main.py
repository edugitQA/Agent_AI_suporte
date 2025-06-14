from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.agent_service import carregar_agente

app = FastAPI()
agente = carregar_agente()

class Pergunta(BaseModel):
    pergunta: str


@app.get("/")
def index():
    return {"mensagem": "Agente de IA Online"}

@app.post("/perguntar")
def perguntar(pergunta: Pergunta):
    resposta = agente.run(pergunta.pergunta)
    return {"resposta": resposta}

