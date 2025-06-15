# 🧠 Agente de IA Conversacional com RAG integrado com chat no front

**Autor:** Eduardo A.  
**Versão:** 1.0.0  
**Data:** Junho 2025

---

## 📘 Sumário Executivo

Este projeto implementa um agente de IA conversacional baseado na arquitetura **RAG (Retrieval-Augmented Generation)**, ideal para responder perguntas sobre produtos de um catálogo online. Desenvolvido em Python com **FastAPI**, **LangChain**, **ChromaDB** e **OpenAI API**, oferece uma solução **escalável**, **robusta** e **inteligente** para atendimento ao cliente automatizado.

A arquitetura modular e as boas práticas de engenharia adotadas tornam o sistema fácil de manter, expandir e integrar com aplicações empresariais existentes.

---

## 🧩 Contexto do Projeto

A evolução do e-commerce exige **respostas imediatas e contextuais**. Sistemas baseados apenas em regras ou FAQ não atendem à complexidade das interações modernas.

A arquitetura RAG combina:
- **Busca semântica vetorial** (recuperação de documentos relevantes)
- **Geração de linguagem natural** (respostas contextualizadas)

Essa sinergia permite uma compreensão mais profunda e respostas mais precisas para os usuários.

---

## ✅ Benefícios Esperados

- **💰 Redução de Custos Operacionais**  
- **⏰ Disponibilidade 24/7**  
- **📏 Consistência nas Respostas**  
- **📈 Escalabilidade Horizontal e Vertical**  
- **📊 Geração de Insights Analíticos**

---

## 📌 Escopo e Limitações

- **Não substitui atendimento humano** em situações sensíveis.
- Utiliza a **OpenAI API**, gerando custos por uso.
- Futura possibilidade de uso de **modelos open-source** para otimizar custos operacionais.

---

## 🔁 Fluxo de Dados e Processamento

1. **Recepção da Consulta**
2. **Conversão em Embedding**
3. **Busca por Similaridade em Vector Store**
4. **Geração de Resposta via LLM**
5. **Pós-processamento e Retorno via API**

---

## 🧱 Arquitetura e Tecnologias

### 📦 Backend (Python)
- **FastAPI**: framework web leve e assíncrono
- **LangChain**: orquestração RAG com abstrações de LLMs
- **ChromaDB**: vector store eficiente para embeddings
- **Pydantic**: validação e serialização robusta
- **OpenAI API**: geração de texto e embeddings

**Estrutura:**
app/
├── main.py # Entrypoint do FastAPI
├── agent_service.py # Lógica principal do agente
├── config.py # Configurações via env vars
├── utils.py # Utilitários diversos



### 🚀 Execução:
```bash
uvicorn app.main:app --reload

💻 Frontend (React + Vite)
Interface responsiva e interativa conectada ao backend via API REST.

Stack:

React 18

Tailwind CSS + Shadcn/UI

Framer Motion (animações)

Radix UI (acessibilidade)

Axios (requisições)

pnpm (gerenciador de pacotes)

EStrutura:

front_end/
├── src/
│   ├── App.jsx
│   ├── components/
│   └── pages/
├── vite.config.js

🔧 Instalação
Backend
bash
Copiar
Editar
# Requisitos: Python 3.12+
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
bash
Copiar
Editar
# Requisitos: Node.js 18+, pnpm
cd front_end
pnpm install
pnpm dev
🔌 Integração com Chat IA
O frontend se conecta à API via:

bash
Copiar
Editar
http://localhost:8000/api/v1/chat/message
Certifique-se de que o backend esteja ativo para o funcionamento do chatbot.

🚀 Scripts Disponíveis (Frontend)
pnpm dev: inicia servidor local

pnpm build: build de produção

pnpm preview: preview da build

pnpm lint: linter de código

🧪 Validação com Pydantic
Segurança de tipos

Validadores customizados

Serialização automática

Documentação automática com FastAPI

🧩 LangChain - Orquestração RAG
Integração de LLMs e retrievers

Pipeline estruturado com chains

Gerenciamento avançado de prompts

Extensibilidade modular

🛠️ Considerações sobre Dependências
Critérios de seleção:

Maturidade do ecossistema

Licenças permissivas

Segurança e atualização constante

Integração fluida entre componentes

📈 Impacto no Negócio
Experiência do cliente otimizada

Suporte contínuo e responsivo

Redução da carga operacional

Insights sobre comportamento dos clientes

Vantagem competitiva estratégica

📚 Lições Aprendidas
Qualidade da base de conhecimento é essencial

Automação exige supervisão humana

Monitoramento contínuo impulsiona melhorias

Arquitetura modular garante evolução sustentável

💡 TechStore – Página de Vendas com IA
Uma aplicação frontend moderna com um assistente de IA embarcado.

Funcionalidades
Catálogo de produtos (smartphones, laptops, etc.)

Busca, filtros, favoritos e carrinho

Chatbot para dúvidas sobre produtos

Tecnologias
React + Vite + Tailwind CSS

Framer Motion, Lucide, Shadcn/UI

Axios, Radix UI

Instalação Frontend
bash
Copiar
Editar
pnpm install
pnpm dev
Acesse via: http://localhost:5173

🤝 Contribuição
Fork o repositório

Crie sua branch:

bash
Copiar
Editar
git checkout -b minha-feature
Commit:

bash
Copiar
Editar
git commit -m "feat: adiciona minha feature"
Push:

bash
Copiar
Editar
git push origin minha-feature
Abra um Pull Request

📄 Licença
Distribuído sob licença MIT. Veja LICENSE para mais detalhes.


Desenvolvido por Eduardo A. — TechStore
Powered by OpenAI, LangChain, FastAPI e Engenharia de Qualidade
  
---

Se quiser, posso gerar também um arquivo `LICENSE` e o `requirements.txt` baseados nas tecnologias listadas. Quer que eu adicione isso também? [Requisitos do projeto](f), [Geração automática do LICENSE](f), ou [Deploy em ambiente cloud](f) podem ser os próximos passos.

