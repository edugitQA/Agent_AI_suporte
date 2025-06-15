import json
from datetime import datetime
import os

LOG_FILE = "backend/app/logs/log.json"

def log_interaction(user_id, pergunta, resposta):
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps({
            "user_id": user_id,
            "pergunta": pergunta,
            "resposta": resposta,
            "timestamp": datetime.now().isoformat()
        }) + "\n")
