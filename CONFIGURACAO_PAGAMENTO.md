# Configuração Rápida - Pagamento Mercado Pago

## ⚡ Setup Rápido

### 1. Criar arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com:

```env
VITE_MERCADO_PAGO_ACCESS_TOKEN=TEST-ACCESS-TOKEN
```

### 2. Para Testes

Use `TEST-ACCESS-TOKEN` como token. Isso permite testar sem credenciais reais.

### 3. Para Produção

1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Crie uma aplicação
3. Copie o Access Token de **Produção**
4. Substitua no `.env`:
   ```env
   VITE_MERCADO_PAGO_ACCESS_TOKEN=seu-token-de-producao
   ```

### 4. Testar

1. Execute `npm run dev`
2. Adicione produtos ao carrinho
3. Clique em "Finalizar Compra"
4. Preencha o formulário
5. Será redirecionado para o Mercado Pago

## 🧪 Cartões de Teste

**Aprovado:**
- Número: `5031 7557 3453 0604`
- CVV: `123`
- Data: Qualquer data futura

**Recusado:**
- Número: `5031 4332 1540 6351`

## ⚠️ Importante

- **NUNCA** commite o arquivo `.env` no Git
- Em produção, use um backend para segurança
- O token deve ser mantido em segredo

