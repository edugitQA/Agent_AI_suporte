import json
from datetime import datetime
import os
from typing import Any, Dict

LOG_FILE = "backend/app/logs/logs.json"

def log_interaction(user_id: str, pergunta: str, resposta: Dict[str, Any]) -> None:
    """
    Registra uma interação do usuário com o agente.
    
    Args:
        user_id (str): Identificador do usuário
        pergunta (str): Pergunta feita pelo usuário
        resposta (Dict[str, Any]): Resposta do agente incluindo conteúdo e metadados
    """
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    
    # Prepara o registro do log
    log_entry = {
        "user_id": user_id,
        "pergunta": pergunta,
        "resposta": resposta.get("result", "") if isinstance(resposta, dict) else str(resposta),
        "timestamp": datetime.now().isoformat()
    }
    
    try:
        # Carrega logs existentes
        if os.path.exists(LOG_FILE) and os.path.getsize(LOG_FILE) > 0:
            with open(LOG_FILE, "r") as f:
                try:
                    logs = json.load(f)
                    if not isinstance(logs, list):
                        logs = []
                except json.JSONDecodeError:
                    logs = []
        else:
            logs = []
        
        # Adiciona novo registro
        logs.append(log_entry)
        
        # Salva todos os logs
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump(logs, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        print(f"Erro ao registrar log: {str(e)}")
