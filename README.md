# Meu Eu 3D — Web

Site institucional e de pedidos do estúdio **Meu Eu 3D** (miniaturas
impressas em 3D e pintadas à mão). Front-end em React (CRA) com backend
100% Firebase, rodando no plano gratuito (Spark): Firestore + Hosting.

> O cliente envia o pedido sem anexar foto. A foto e demais detalhes são
> combinados direto pelo WhatsApp/e-mail pela equipe do estúdio.

## Stack

- React 19 + React Router 7
- framer-motion, react-icons
- Firebase Web SDK (Firestore)
- Firebase Extension (opcional): **Trigger Email from Firestore**
- Firebase Hosting para deploy

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha com as credenciais do Firebase:

```bash
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=meu-eu-3d
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

# E-mail que recebe a notificação de novo pedido (opcional)
REACT_APP_ORDER_NOTIFICATION_EMAIL=
```

Para gerar com a configuração correta do projeto:

```bash
firebase apps:sdkconfig WEB --project meu-eu-3d
```

## Desenvolvimento

```bash
npm install
npm start      # http://localhost:3000
```

## Deploy

```bash
npm run build
firebase deploy --only hosting,firestore:rules
```

## Fluxo de pedidos

1. Cliente escolhe o produto, o tamanho e escreve observações em `/pedido/:slug`.
2. Item entra no carrinho (estado local + `localStorage`).
3. Em `/checkout` o cliente preenche dados de contato e clica em "Enviar pedido".
4. O pedido é gravado em `orders/{orderId}` no Firestore e (se configurado)
   um documento em `mail/` dispara a Firebase Extension "Trigger Email from
   Firestore" para avisar o dono por e-mail.
5. Em seguida, a equipe entra em contato com o cliente pelo WhatsApp/e-mail
   para pedir as fotos de referência, alinhar detalhes e combinar pagamento.

## Coleções Firestore

- `orders/{orderId}`: documento do pedido (cliente, itens, status, totalCents).
- `mail/{id}`: fila consumida pela extension Trigger Email (opcional).

## Plano gratuito

Este projeto está desenhado para rodar inteiramente no plano Spark:

- **Não usa** Firebase Storage (foto é combinada fora do sistema).
- **Não precisa** de Cloud Functions próprias.
- A extension "Trigger Email" é opcional e exige Blaze — se não for
  instalada, os pedidos continuam sendo salvos normalmente; apenas o
  aviso automático por e-mail fica desligado.
