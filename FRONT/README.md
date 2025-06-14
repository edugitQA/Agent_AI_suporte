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
