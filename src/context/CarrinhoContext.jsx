import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { carregarCarrinho, salvarCarrinho } from '../utils/storage';
import toast from 'react-hot-toast';

const CarrinhoContext = createContext();

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }
  return context;
};

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState(() => carregarCarrinho());

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    salvarCarrinho(carrinho);
  }, [carrinho]);

  const adicionarAoCarrinho = useCallback((produto) => {
    setCarrinho((prev) => {
      const novoCarrinho = [...prev, produto];
      toast.success(`Produto ${produto.nome} adicionado!`);
      return novoCarrinho;
    });
  }, []);

  const removerDoCarrinho = useCallback((indexParaRemover) => {
    setCarrinho((prev) => {
      const item = prev[indexParaRemover];
      const novoCarrinho = prev.filter((_, index) => index !== indexParaRemover);
      toast.success(`${item.nome} removido do carrinho`);
      return novoCarrinho;
    });
  }, []);

  const limparCarrinho = useCallback(() => {
    setCarrinho([]);
    toast.success('Carrinho limpo');
  }, []);

  const itensNoCarrinho = carrinho.length;

  const valorTotal = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const value = {
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    itensNoCarrinho,
    valorTotal,
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};

