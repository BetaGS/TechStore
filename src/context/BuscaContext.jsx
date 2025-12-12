import { createContext, useContext, useState, useCallback } from 'react';

const BuscaContext = createContext();

export const useBusca = () => {
  const context = useContext(BuscaContext);
  if (!context) {
    throw new Error('useBusca deve ser usado dentro de BuscaProvider');
  }
  return context;
};

export const BuscaProvider = ({ children }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const atualizarBusca = useCallback((termo) => {
    setTermoBusca(termo);
  }, []);

  const atualizarFiltroCategoria = useCallback((categoria) => {
    setCategoriaFiltro(categoria);
  }, []);

  const limparFiltros = useCallback(() => {
    setTermoBusca('');
    setCategoriaFiltro('');
  }, []);

  const value = {
    termoBusca,
    categoriaFiltro,
    atualizarBusca,
    atualizarFiltroCategoria,
    limparFiltros,
  };

  return <BuscaContext.Provider value={value}>{children}</BuscaContext.Provider>;
};

