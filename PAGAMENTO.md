# Sistema de Pagamento - Mercado Pago

## 🎯 Funcionalidades Implementadas

### 1. Serviço de Integração (`mercadoPagoService.js`)
- ✅ Criação de preferência de pagamento
- ✅ Conversão de itens do carrinho para formato Mercado Pago
- ✅ Configuração de URLs de retorno (sucesso, falha, pendente)
- ✅ Redirecionamento para checkout do Mercado Pago
- ✅ Obtenção de informações de pagamento

### 2. Página de Checkout (`/checkout`)
- ✅ Formulário completo de dados pessoais
- ✅ Formulário de endereço de entrega
- ✅ Validação com Zod e React Hook Form
- ✅ Resumo do pedido com itens e totais
- ✅ Integração com dados do usuário logado
- ✅ Loading state durante processamento
- ✅ Tratamento de erros

### 3. Páginas de Resultado
- ✅ **Pagamento Sucesso** (`/pagamento/sucesso`)
  - Confirmação visual
  - Informações do pagamento
  - Limpeza automática do carrinho
  - Links para voltar ou ver pedidos

- ✅ **Pagamento Falha** (`/pagamento/falha`)
  - Mensagem de erro
  - Opção de tentar novamente
  - Voltar ao carrinho

### 4. Integração com Carrinho
- ✅ Botão "Finalizar Compra" redireciona para checkout
- ✅ Validação de carrinho não vazio
- ✅ Dados do carrinho passados para pagamento

## 🔧 Configuração

### 1. Obter Access Token do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Crie uma aplicação ou use uma existente
3. Copie o **Access Token** (Test ou Production)

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_MERCADO_PAGO_ACCESS_TOKEN=seu-access-token-aqui
VITE_APP_URL=http://localhost:5173
```

**Importante**: 
- Use `TEST-ACCESS-TOKEN` para testes
- Use seu token de produção apenas em produção
- Nunca commite o arquivo `.env` no Git

### 3. Instalar Dependências

As dependências já estão no `package.json`:
- `react-hook-form` - Formulários
- `zod` - Validação
- `@hookform/resolvers` - Integração

## 📋 Fluxo de Pagamento

1. **Carrinho** → Usuário clica em "Finalizar Compra"
2. **Checkout** → Preenche dados pessoais e endereço
3. **Validação** → Formulário validado com Zod
4. **Mercado Pago** → Cria preferência de pagamento
5. **Redirecionamento** → Usuário vai para checkout do Mercado Pago
6. **Pagamento** → Usuário escolhe método e paga
7. **Retorno** → Redirecionado para `/pagamento/sucesso` ou `/pagamento/falha`
8. **Confirmação** → Carrinho limpo automaticamente

## 🎨 Validações Implementadas

### Dados Pessoais
- Nome: mínimo 2 caracteres
- Email: formato válido
- Telefone: mínimo 10 caracteres

### Endereço
- CEP: mínimo 8 caracteres
- Estado: exatamente 2 caracteres
- Cidade: mínimo 2 caracteres
- Endereço: mínimo 5 caracteres
- Número: obrigatório
- Complemento: opcional

## 🔒 Segurança

### ⚠️ IMPORTANTE - Ambiente de Produção

**NUNCA** faça chamadas diretas à API do Mercado Pago do frontend em produção!

Em produção, você deve:

1. **Criar um Backend** para:
   - Armazenar o Access Token de forma segura
   - Criar preferências de pagamento
   - Processar webhooks
   - Validar pagamentos

2. **Fluxo Recomendado**:
   ```
   Frontend → Backend → Mercado Pago API
   ```

3. **Webhooks**:
   - Configure webhooks no painel do Mercado Pago
   - Processe notificações no backend
   - Atualize status dos pedidos

### Ambiente de Teste

Para testes, você pode usar:
- Access Token de teste: `TEST-ACCESS-TOKEN`
- Cartões de teste do Mercado Pago
- Sandbox do Mercado Pago

## 📱 Cartões de Teste

Use estes cartões para testar pagamentos:

**Aprovado:**
- Número: `5031 7557 3453 0604`
- CVV: `123`
- Data: Qualquer data futura
- Nome: Qualquer nome

**Recusado:**
- Número: `5031 4332 1540 6351`

Mais cartões: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/testing

## 🚀 Como Usar

### 1. Configurar Token

```bash
# Criar arquivo .env
echo "VITE_MERCADO_PAGO_ACCESS_TOKEN=TEST-ACCESS-TOKEN" > .env
```

### 2. Testar Pagamento

1. Adicione produtos ao carrinho
2. Clique em "Finalizar Compra"
3. Preencha o formulário de checkout
4. Clique em "Ir para Pagamento"
5. Será redirecionado para o Mercado Pago
6. Use cartão de teste
7. Após pagamento, será redirecionado de volta

## 📁 Estrutura de Arquivos

```
src/
├── services/
│   └── mercadoPagoService.js      # Serviço de integração
├── pages/
│   ├── Checkout/
│   │   ├── Checkout.jsx          # Página de checkout
│   │   └── Checkout.css
│   ├── PagamentoSucesso/
│   │   ├── PagamentoSucesso.jsx  # Página de sucesso
│   │   └── PagamentoSucesso.css
│   └── PagamentoFalha/
│       ├── PagamentoFalha.jsx    # Página de falha
│       └── PagamentoFalha.css
```

## 🔄 Próximos Passos (Opcional)

- [ ] Criar backend para processar pagamentos
- [ ] Implementar webhooks para confirmação
- [ ] Adicionar histórico de pedidos
- [ ] Salvar endereços do usuário
- [ ] Implementar múltiplos métodos de pagamento
- [ ] Adicionar cupons de desconto
- [ ] Calcular frete real
- [ ] Rastreamento de pedidos

## 📚 Documentação do Mercado Pago

- API Reference: https://www.mercadopago.com.br/developers/pt/reference
- Checkout Pro: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro
- Webhooks: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks

---

**Status**: Sistema de pagamento funcional e pronto para testes! 🎉

**Nota**: Lembre-se de criar um backend antes de ir para produção!

