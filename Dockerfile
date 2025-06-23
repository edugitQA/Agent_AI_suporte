# Dockerfile para o backend FastAPI com LangChain, OpenAI e SQLite
FROM python:3.12-slim

# Variáveis de ambiente para evitar prompts do Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instala dependências do sistema
RUN apt-get update && \
    apt-get install -y build-essential gcc && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos de requirements
COPY requirements.txt ./

# Instala as dependências do Python
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia o restante do código da aplicação
COPY backend/ ./

# Expõe a porta padrão do FastAPI
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
