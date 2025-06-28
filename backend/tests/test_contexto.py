def test_memoria_conversacional():
    user_id = "test_contexto"
    agente = get_agent_for_user(user_id)

    pergunta1 = "Estou interessado no produto X"
    pergunta2 = "Qual o prazo de entrega?"

    agente.run(pergunta1)
    resposta = agente.run(pergunta2)

    assert "produto X" in resposta or "entrega" in resposta.lower(), "Não manteve o contexto"
