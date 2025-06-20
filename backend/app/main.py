from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from app.services.agent_service import carregar_agente
import time
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from app.utils.memory_pool import get_agent_for_user
from app.core.logger import log_interaction, get_user_history

app = FastAPI()
agente = carregar_agente()

# Adicionando o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique ['http://localhost:5173']
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pergunta(BaseModel):
    pergunta: str

@app.get("/")
def index():
    return {"message": "Agente de IA Online"}

@app.post("/user/{user_id}/perguntar")
async def perguntar(user_id: str, request: Request):
    try:
        data = await request.json()
        pergunta = data.get("pergunta", "")
        if not pergunta:
            raise HTTPException(status_code=400, detail="Pergunta não fornecida.")

        agente = get_agent_for_user(user_id)
        # Buscar histórico recente do usuário
        historico = get_user_history(user_id, limit=5)
        # Montar contexto para a LLM
        contexto = "\n".join([
            f"Usuário: {h['pergunta']}\nAgente: {h['resposta']}" for h in historico
        ])
        prompt = f"{contexto}\nUsuário: {pergunta}\nAgente:"
        inicio_execucao = time.time()
        resultado = agente({"query": prompt})
        tempo_exec = f"{(time.time() - inicio_execucao) * 1000:.2f}ms"

        # Serializa os documentos fonte em um formato JSON válido
        fontes_usadas = []
        if resultado.get("source_documents"):
            for doc in resultado["source_documents"]:
                fonte = {
                    "arquivo": str(doc.metadata.get("source", "desconhecido")),
                    "conteudo_relevante": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
                }
                fontes_usadas.append(fonte)

        # Garantir que tudo seja serializável
        response_data = {
            "consulta": {
                "pergunta": str(pergunta),
                "timestamp": datetime.now().isoformat(),
            },
            "resposta": {
                "conteudo": str(resultado.get("result", "Não foi possível gerar uma resposta.")),
                "fontes_usadas": fontes_usadas
            },
            "metadata": {
                "tempo_execucao": str(tempo_exec),
                "status": "success"
            }
        }

        # Log após serialização
        log_interaction(user_id, pergunta, {"result": str(resultado.get("result")), "sources": fontes_usadas})

        return response_data

    except Exception as e:
        error_response = {
            "consulta": {
                "pergunta": str(pergunta),
                "timestamp": datetime.now().isoformat(),
            },
            "resposta": {
                "conteudo": f"Erro ao processar pergunta: {str(e)}",
                "fontes_usadas": []
            },
            "metadata": {
                "tempo_execucao": "0ms",
                "status": "error",
                "erro": str(e)
            }
        }
        return error_response
