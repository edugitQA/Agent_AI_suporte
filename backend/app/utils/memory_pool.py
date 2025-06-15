# TODO: Ajustar imports para os módulos corretos do langchain, se necessário.
# from langchain.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain, RetrievalQA
from app.services.agent_service import carregar_agente

memory_pool = {}

def get_agent_for_user(user_id: str):
    if user_id not in memory_pool:
        # memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        # chain = carregar_agente(memory=memory)
        chain = carregar_agente()  # Ajustado para não quebrar
        memory_pool[user_id] = chain
    return memory_pool[user_id]
