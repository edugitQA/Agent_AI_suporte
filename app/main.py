from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.agent_service import carregar_agente
import time
from datetime import datetime

app = FastAPI()
agente = carregar_agente()

class Pergunta(BaseModel):
    pergunta: str

@app.get("/")
def index():
    return {"message": "Agente de IA Online"}

@app.post("/perguntar")
def perguntar(pergunta: Pergunta):
    try:
        inicio = time.time()
        
        # Usar invoke() em vez de run()
        resultado = agente.invoke({"query": pergunta.pergunta})
        
        tempo_exec = f"{int((time.time() - inicio) * 1000)}ms"
        
        # Estrutura da resposta melhorada
        return {
            "consulta": {
                "pergunta": pergunta.pergunta,
                "timestamp": datetime.now().isoformat(),
            },
            "resposta": {
                "conteudo": resultado["result"],
                "fontes_usadas": [
                    {
                        "arquivo": doc.metadata.get("source", "desconhecido"),
                        "conteudo_relevante": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
                    }
                    for doc in resultado.get("source_documents", [])
                ]
            },
            "metadata": {
                "tempo_execucao": tempo_exec,
                "status": "success"
            }
        }
        
    except Exception as e:
        return {
            "consulta": {
                "pergunta": pergunta.pergunta,
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