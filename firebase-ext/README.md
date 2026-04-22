# Firebase Extensions

## Trigger Email from Firestore (notificação de novos pedidos)

A aplicação grava um documento em `mail/` a cada novo pedido — basta instalar a
Firebase Extension oficial **firebase/firestore-send-email** (Trigger Email
from Firestore) apontando para essa coleção.

### Pré-requisitos

- Projeto no plano **Blaze** (obrigatório para extensions).
- Credenciais SMTP (Gmail com **Senha de app**, SendGrid, Mailgun, etc).

### Passos

1. Ative o plano Blaze em <https://console.firebase.google.com/project/meu-eu-3d/usage/details>.
2. Copie `trigger-email.params.example` para `trigger-email.params` e preencha
   as credenciais SMTP.
3. Instale a extension:

   ```bash
   firebase ext:install firebase/firestore-send-email \
     --project=meu-eu-3d \
     --params=firebase-ext/trigger-email.params
   ```

4. Preencha `REACT_APP_ORDER_NOTIFICATION_EMAIL` no `.env` com o e-mail
   destinatário e rode `npm run build && firebase deploy --only hosting`.

### Gmail com Senha de app

1. Ative a verificação em duas etapas da sua conta Google.
2. Em <https://myaccount.google.com/apppasswords> gere uma "Senha de app" para
   "E-mail". Use essa senha no lugar de `SENHA_DE_APP` no URI SMTP.
