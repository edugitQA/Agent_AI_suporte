import pytest
from app.memory_pool import get_agent_for_user

def test_resposta_base():
    user_id = "test_user"
    pergunta = "Qual é o prazo de garantia?"
    agente = get_agent_for_user(user_id)
    resposta = agente.run(pergunta)

    assert any(palavra in resposta.lower() for palavra in ["garantia", "meses", "ano"]), "Resposta fora do esperado"
