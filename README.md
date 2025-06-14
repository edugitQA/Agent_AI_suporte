# Agente AI Suporte

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

### Frontend
- **Localização:** `FRONT/`
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
2. Instale as dependências:
   ```bash
   cd FRONT
   pnpm install
   ```

## Execução

### Backend
Execute o servidor Python:
```bash
python app/main.py
```

### Frontend
Execute o servidor de desenvolvimento:
```bash
cd FRONT
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
