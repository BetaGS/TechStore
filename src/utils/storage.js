// Utilitários para localStorage
export const salvarCarrinho = (carrinho) => {
  try {
    localStorage.setItem('techstore_carrinho', JSON.stringify(carrinho));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};

export const carregarCarrinho = () => {
  try {
    const carrinhoSalvo = localStorage.getItem('techstore_carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
    return [];
  }
};

