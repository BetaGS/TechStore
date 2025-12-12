// Utilitários de formatação
export const formatarPreco = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const formatarParcelamento = (valor, parcelas = 12) => {
  return formatarPreco(valor / parcelas);
};

