# ArenaMatch — Sistema de Gestão de Torneios de Vôlei de Praia


---

## 2. Tecnologias Utilizadas
*   **Back-end:** NestJS (Node.js) com TypeScript
*   **Front-end:** HTML, CSS e JavaScript puros
*   **Infraestrutura:** Docker e Docker Compose
*   **Integração:** API Externa de Clima (OpenWeatherMap)

---

## 3. Divisão de Responsabilidades (Equipe)
Conforme as orientações de desenvolvimento incremental e individualizado, o projeto foi dividido em 4 grandes pilares de desenvolvimento[cite: 1]:

### 👤 Integrante 1: Ozaeltton — Segurança e Infraestrutura de Dados
*   **Branch:** `/nome-auth-e-base`
*   **Responsabilidades e Entregas:**
    *   Configuração e inicialização da arquitetura modular do projeto em NestJS[cite: 1].
    *   Modelagem inicial do banco de dados e configuração das conexões/ORM[cite: 1].
    *   Criação do módulo de Usuários[cite: 1].
    *   Implementação de cadastro com hash seguro de senhas e autenticação via bcypt[cite: 1].

### 👤 Integrante 2: Abnoan — Regras de Negócio e Domínio principal
*   **Branch:** `Abnoan_Torneios_e_duplas`
*   **Responsabilidades e Entregas:**
    *   Criação dos módulos de negócio principais: `Torneios` e `Duplas`[cite: 1].
    *   Implementação de validações rígidas de entrada de dados através de DTOs, `class-validator` e `class-transformer`[cite: 1].
    *   Desenvolvimento do fluxo de alteração de estado do recurso: Pedido de Inscrição da dupla transitando entre `PENDENTE`, `APROVADA` ou `REJEITADA`[cite: 1].
    *   Criação de regras de negócio complexas que impedem inscrições inválidas ou duplicadas, retornando códigos HTTP coerentes (`400`, `409`)[cite: 1].
    *   Geração dos scripts de *Seed* para alimentação prévia do banco de dados[cite: 1].

### 👤 Integrante 3: Marcos Henrique — Partidas, Integração Externa e Performance
*   **Branch:** `/nome-partidas-e-clima`
*   **Responsabilidades e Entregas:**
    *   Desenvolvimento do módulo de `Partidas` (associação entre Torneio, Dupla A, Dupla B e controle de placares)[cite: 1].
    *   Integração isolada em serviço próprio com a API REST Externa de Clima para previsão do tempo no local dos jogos[cite: 1].
    *   Tratamento resiliente de falhas (`timeout` e indisponibilidade) do serviço de clima por meio de interceptação de erros[cite: 1].
    *   Aplicação de estratégia de Cache na rota de listagem da Tabela de Classificação do torneio para ganho de desempenho[cite: 1].

### 👤 Integrante 4: Geilson — Front-end, Upload de Arquivos e DevOps
*   **Branch:** `/geilson-front-upload-docker`
*   **Responsabilidades e Entregas:**
    *   Desenvolvimento da interface Web funcional consumindo as rotas da API RESTful[cite: 1].
    *   Criação da funcionalidade de upload do comprovante de pagamento da dupla utilizando dados `multipart/form-data`[cite: 1].
    *   Validação estrita de tipo e tamanho do arquivo enviado no back-end, impedindo a exposição de caminhos binários[cite: 1].
    *   Empacotamento da aplicação com `Dockerfile`, `.dockerignore` e `docker-compose.yml`[cite: 1].
    *   Deploy em produção e criação da rota de verificação de saúde da API (*Health Check*)[cite: 1].

---
