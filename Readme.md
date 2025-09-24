# 🏥 ClinSys - Backend

Backend de um sistema completo de **gestão clínica**, desenvolvido para aprendizado prático e evolução como **desenvolvedor frontend júnior** que também domina conceitos de backend.

Este projeto foi pensado para simular o dia a dia de uma clínica, com **login por setor, gestão de pacientes, consultas, exames, prontuários e comunicação interna**.

---

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (Autenticação)**
- **Day.js**
- **CORS**
- **Clean Code & RESTful API**

---

## 🔐 Login por setor

Cada profissional acessa apenas o que precisa, com funcionalidades exclusivas:

### 👑 Admin

- Acompanhar todas as transações financeiras.
- Visualizar balanço financeiro completo.
- Gerenciar funcionários (CRUD completo).
- Criar e organizar escalas de trabalho.

### 🩺 Médico

- Histórico médico completo do paciente (diagnósticos, prescrições, evolução, alergias).
- Acesso a sinais vitais coletados pela enfermagem.
- Histórico e solicitação de exames.
- Encerramento de consulta com notificação automática para recepção.
- Notificação de ausência → consultas do dia desmarcadas automaticamente.

### 🗂️ Recepcionista

- Gerenciar pagamentos de consultas.
- Agendar/reagendar consultas e vacinações.
- Cadastrar novos pacientes.
- Receber notificações em tempo real (consultas, exames, cancelamentos, ausências).

### 💉 Enfermagem

- Vacinação registrada em sistema (cartão de vacinas digital).
- Visualizar histórico de vacinas.
- Coleta de sangue para exames solicitados.
- Coleta de sinais vitais.
- Notificações específicas do setor.

### 🔬 Laboratório

- Receber solicitações de exames (glicemia, hemograma, tireoide…).
- Registrar e atualizar resultados.
- Enviar notificações personalizadas quando resultados ficam prontos.

---

## 📂 Estrutura de Pastas

```
📦 clinsys-backend
 ┣ 📁src
 ┃ ┣ 📁 assets
 ┃ ┣ 📁 Config
 ┃ ┣ 📁 Controller
 ┃ ┣ 📁 Services
 ┃ ┣ 📁 Model
 ┃ ┣ 📁 Middlewares
 ┃ ┣ 📁 Utils
 ┃ ┣ 📄 app.js
 ┃ ┣ 📄 router.js
 ┃ ┣ 📄 server.js
 ┣ 📄 .env
 ┣ 📄 .env.example
```

---

## 📌 Funcionalidades Principais

- Autenticação JWT com diferentes papéis (Admin, Médico, Recepcionista, Enfermagem, Laboratório, Paciente).
- Gestão de consultas, exames, prescrições, laudos e sinais vitais.
- Chat interno entre funcionários (mensagens diretas e por setor).
- Sistema de notificações inteligente e escalável.
- Regras de negócio bem definidas (permissões, restrições e auditoria).
- API seguindo **padrão RESTful**.

---

## 📚 Documentação da API

A API foi organizada por módulos, com rotas RESTful para:

- **Funcionários** (`/funcionario`)
- **Pacientes** (`/paciente`)
- **Consultas** (`/appointments`)
- **Pagamentos** (`/payments`)
- **Exames** (`/solicitar-exame`, `/exame-sangue`, `/exame-tireoide`, `/exame-glicose`)
- **Prontuário** (histórico médico, anotações, alergias, prescrições, sinais vitais)
- **Chat** (`/chat`)
- **Notificações** (`/notifications`)

📌 Para ver todas as rotas implementadas, dê uma olhada no **Fluxograma**.

---

## 🛠️ Como rodar o projeto

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/clinsys-backend.git

# Acesse a pasta
cd clinsys-backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Rode a aplicação
npm run dev
```

---

## ✅ Requisitos do Projeto

- Requisitos Funcionais (RFs)
- Regras de Negócio (RNs)
- Requisitos Não Funcionais (RNFs)
