# Agente AI Suporte

![Imagem do Projeto](image.png)

## Descrição
Este projeto combina um backend em Python com um frontend moderno em React para criar um agente de suporte inteligente. O objetivo é fornecer uma interface interativa e eficiente para atender às necessidades dos usuários.

## Estrutura do Projeto

### Backend
- **Localização:** `app/`
- **Principais Arquivos:**
  - `main.py`: Ponto de entrada do backend.
  - `agent_service.py`: Contém a lógica principal do agente.
  - `config.py`: Configurações do projeto.
  - `utils.py`: Funções utilitárias.
- **Dependências:** Listadas no arquivo `requirements.txt`.
- **Comando para rodar:**
  ```bash
  uvicorn app.main:app --reload
  ```

### Frontend
- **Localização:** `front_end/`
- **Principais Arquivos:**
  - `src/App.jsx`: Componente principal do frontend.
  - `src/components/`: Contém componentes reutilizáveis.
  - `vite.config.js`: Configuração do Vite.
- **Dependências:** Listadas no arquivo `package.json`.

## Instalação

### Backend
1. Certifique-se de ter o Python 3.12 instalado.
2. Crie um ambiente virtual:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend
1. Certifique-se de ter o Node.js e o gerenciador de pacotes `pnpm` instalados.
2. Navegue até o diretório `front_end`:
   ```bash
   cd front_end
   ```
3. Instale as dependências:
   ```bash
   pnpm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```

## Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adiciona minha feature"
   ```
4. Envie suas alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

# TechStore - Página de Vendas com IA

TechStore é uma aplicação web moderna de vendas de produtos de tecnologia, com integração de um assistente virtual de IA para tirar dúvidas dos clientes em tempo real.

## Funcionalidades
- Catálogo interativo de produtos (smartphones, laptops, fones, câmeras, etc.)
- Busca, filtros e ordenação de produtos
- Carrinho de compras e favoritos
- Chatbot com IA para responder perguntas sobre produtos
- Design responsivo e moderno
- Animações fluidas com Framer Motion
- Componentes UI do Shadcn/UI

## Tecnologias Utilizadas
- React 18
- Vite
- Tailwind CSS
- Shadcn/UI
- Lucide React (ícones)
- Framer Motion (animações)
- Axios (requisições HTTP)
- Radix UI (componentes acessíveis)

## Instalação
1. **Pré-requisitos:**
   - Node.js 18+
   - pnpm (recomendado)

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```
   O app estará disponível em `http://localhost:5173`.

4. **(Opcional) Build para produção:**
   ```bash
   pnpm build
   ```

## Integração com IA
O chatbot se comunica com um backend de IA em `http://localhost:8000/api/v1/chat/message`. Certifique-se de que o backend esteja rodando para o chat funcionar.

## Scripts Disponíveis
- `pnpm dev` — inicia o servidor de desenvolvimento
- `pnpm build` — gera build de produção
- `pnpm preview` — pré-visualiza o build
- `pnpm lint` — executa o linter

## Estrutura do Projeto
- `src/` — código-fonte React
- `src/components/ui/` — componentes de UI reutilizáveis
- `public/` — arquivos estáticos

---

Desenvolvido por TechStore. Powered by AI.
