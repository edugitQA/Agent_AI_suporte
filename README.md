# 🧠 Agente de IA Conversacional com RAG Integrado

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

