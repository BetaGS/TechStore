// Serviço de integração com Mercado Pago
// IMPORTANTE: Em produção, estas chamadas devem ser feitas no backend por segurança

const MERCADO_PAGO_ACCESS_TOKEN = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN';
const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com';

/**
 * Cria uma preferência de pagamento no Mercado Pago
 * @param {Array} items - Array de itens do carrinho
 * @param {Object} payer - Dados do comprador
 * @param {string} backUrl - URL de retorno após pagamento
 * @returns {Promise<Object>} - Dados da preferência criada
 */
export const criarPreferenciaPagamento = async (items, payer, backUrl) => {
  try {
    // Converter itens do carrinho para formato do Mercado Pago
    const itemsMP = items.map((item) => ({
      title: item.nome,
      description: item.categoria || 'Produto TechStore',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: parseFloat(item.preco.toFixed(2)),
      picture_url: item.imagem,
    }));

    const preferenceData = {
      items: itemsMP,
      payer: {
        name: payer.name || 'Cliente',
        email: payer.email || 'cliente@example.com',
      },
      back_urls: {
        success: `${backUrl}/pagamento/sucesso`,
        failure: `${backUrl}/pagamento/falha`,
        pending: `${backUrl}/pagamento/pendente`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },
      notification_url: `${backUrl}/webhook/mercadopago`,
      statement_descriptor: 'TECHSTORE',
      external_reference: `ORDER-${Date.now()}`,
    };

    const response = await fetch(`${MERCADO_PAGO_API_URL}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar preferência de pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    throw error;
  }
};

/**
 * Obtém informações de um pagamento
 * @param {string} paymentId - ID do pagamento
 * @returns {Promise<Object>} - Dados do pagamento
 */
export const obterPagamento = async (paymentId) => {
  try {
    const response = await fetch(`${MERCADO_PAGO_API_URL}/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao obter informações do pagamento');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao obter pagamento:', error);
    throw error;
  }
};

/**
 * Redireciona para o checkout do Mercado Pago
 * @param {string} initPoint - URL de inicialização do checkout
 */
export const redirecionarParaCheckout = (initPoint) => {
  window.location.href = initPoint;
};

/**
 * Cria uma preferência de pagamento e redireciona
 * @param {Array} items - Itens do carrinho
 * @param {Object} payer - Dados do comprador
 * @param {string} baseUrl - URL base da aplicação
 */
export const processarPagamento = async (items, payer, baseUrl) => {
  try {
    const preference = await criarPreferenciaPagamento(items, payer, baseUrl);
    if (preference.init_point) {
      redirecionarParaCheckout(preference.init_point);
    } else {
      throw new Error('URL de checkout não disponível');
    }
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    throw error;
  }
};

