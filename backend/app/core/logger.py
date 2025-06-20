import json
from datetime import datetime
import os
from typing import Any, Dict

# Caminho alternativo para importação dinâmica
import importlib.util
import sys

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../db/interaction_db.py'))
spec = importlib.util.spec_from_file_location('interaction_db', db_path)
interaction_db_module = importlib.util.module_from_spec(spec)
sys.modules['interaction_db'] = interaction_db_module
spec.loader.exec_module(interaction_db_module)
InteractionDB = interaction_db_module.InteractionDB

# Caminho absoluto para garantir que os logs sejam sempre salvos na pasta correta
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_FILE = os.path.join(BASE_DIR, "logs", "logs.json")
interaction_db = InteractionDB()

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
        # Salva no banco SQLite
        interaction_db.add_interaction(user_id, pergunta, log_entry["resposta"])
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

def get_user_history(user_id: str, limit: int = 5):
    db = InteractionDB()
    all_interactions = db.get_interactions(user_id)
    # Pega as últimas interações (ordem crescente de timestamp)
    last = all_interactions[-limit:] if len(all_interactions) > limit else all_interactions
    # Retorna lista de dicionários
    return [
        {
            "pergunta": row[2],
            "resposta": row[3],
            "timestamp": row[4]
        } for row in last
    ]
