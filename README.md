# 🧠 Agente de IA Conversacional com RAG Integrado

<p align="center">
  <img src="image.png" alt="Demonstração do Agente de IA" width="400"/>
</p>

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.12%2B-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-%3E%3D0.100-green)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/react-18-blue)](https://react.dev/)

**Autor:** Eduardo A.  
**Versão:** 1.0.0  
**Data:** Junho 2025

---

## 📑 Sumário
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Execução](#execução)
- [Exemplo de Uso](#exemplo-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🏷️ Visão Geral

Este projeto implementa um agente de IA conversacional baseado em **RAG (Retrieval-Augmented Generation)**, ideal para responder perguntas sobre produtos de um catálogo online. Desenvolvido em Python com **FastAPI**, **LangChain**, **ChromaDB** e **OpenAI API**, oferece uma solução escalável, robusta e inteligente para atendimento ao cliente automatizado.

Principais benefícios:
- Redução de custos operacionais
- Disponibilidade 24/7
- Consistência nas respostas
- Escalabilidade
- Geração de insights analíticos

> **Nota:** Não substitui atendimento humano em situações sensíveis. Utiliza a OpenAI API, podendo gerar custos por uso.

---

## 🏗️ Arquitetura

### Backend (Python)
- **FastAPI**: framework web assíncrono
- **LangChain**: orquestração RAG
- **ChromaDB**: vector store para embeddings
- **Pydantic**: validação e serialização
- **OpenAI API**: geração de texto e embeddings

Estrutura principal:
```
backend/app/
├── main.py           # Entrypoint FastAPI
├── services/         # Lógica do agente
├── core/             # Configurações e utilitários
├── models/           # Modelos de dados
├── knowledge/        # Base de conhecimento
```

### Frontend (React + Vite)
- **React 18**
- **Tailwind CSS** + **Shadcn/UI**
- **Framer Motion** (animações)
- **Radix UI** (acessibilidade)
- **Axios** (requisições)

Estrutura principal:
```
frontend/
├── src/
│   ├── App.jsx
│   ├── components/
│   └── hooks/
```

---

## 🛠️ Tecnologias
- Python 3.12+
- FastAPI, LangChain, ChromaDB, Pydantic, OpenAI API
- Node.js 18+, React, Vite, Tailwind CSS, Shadcn/UI, Radix UI, Axios, pnpm

---

## ⚡ Instalação

### Backend
```bash
# Requisitos: Python 3.12+
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
# Requisitos: Node.js 18+, pnpm
cd frontend
pnpm install
pnpm dev
```
Acesse: http://localhost:5173

---

## 🚀 Execução

- Backend: `uvicorn app.main:app --reload` (porta padrão: 8000)
- Frontend: `pnpm dev` (porta padrão: 5173)

Certifique-se de que o backend esteja ativo para o funcionamento do chatbot.

---

## 🐳 Execução com Docker e Docker Compose

Este projeto já está pronto para ser executado em containers Docker, tanto para o backend (FastAPI) quanto para o frontend (React + Vite).

### Pré-requisitos
- Docker
- Docker Compose

### Build e execução dos serviços

No diretório raiz do projeto, execute:

```bash
docker compose up --build
```

- O backend estará disponível em: http://localhost:8000
- O frontend estará disponível em: http://localhost:5173

> **Atenção:**
> O arquivo `pnpm-lock.yaml` é essencial para o build do frontend. Certifique-se de que ele NÃO está listado no `.dockerignore` para evitar problemas de dependências.

### Parar os serviços

```bash
docker compose down
```

---

## 💬 Exemplo de Uso

### Endpoint de Chat
```
POST http://localhost:8000/api/v1/chat/message
Content-Type: application/json

{
  "message": "Quais smartphones estão disponíveis?"
}
```
**Resposta:**
```json
{
  "response": "Atualmente temos os modelos X, Y e Z disponíveis."
}
```

---

## 🧠 Funcionalidade de Memória Persistente (SQLite)

Agora o agente possui memória conversacional persistente! Todas as interações dos usuários são armazenadas automaticamente em um banco de dados SQLite (`backend/db/interactions.db`). Isso permite que o agente "lembre" do histórico de cada usuário e utilize essas informações para respostas mais personalizadas.

**Como funciona:**
- Cada pergunta e resposta é salva no banco, associada ao usuário.
- O agente recupera as últimas interações do usuário e utiliza como contexto para novas respostas.
- O histórico pode ser consultado diretamente via SQLite ou por endpoints customizados.

**Como visualizar o banco:**

Via terminal:
```bash
sqlite3 backend/db/interactions.db
```
No prompt do SQLite:
```sql
SELECT * FROM interactions;
```

Você também pode usar ferramentas gráficas como DB Browser for SQLite ou extensões do VS Code para explorar o banco.

---

## 🤝 Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit: `git commit -m "feat: minha feature"`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

Contribuições, sugestões e issues são bem-vindas!

---

## 📄 Licença

Distribuído sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido por Eduardo A. — TechStore
Powered by OpenAI, LangChain, FastAPI e Engenharia de Qualidade

