import { useMemo } from 'react';
import { X, Filter } from 'lucide-react';
import { useBusca } from '../../context/BuscaContext';
import './Filtros.css';

function Filtros({ categorias }) {
  const { categoriaFiltro, atualizarFiltroCategoria, limparFiltros } = useBusca();

  // Extrair categorias únicas e formatá-las
  const categoriasUnicas = useMemo(() => {
    if (!categorias || categorias.length === 0) return [];
    
    const unicas = [...new Set(categorias)];
    return unicas.map((cat) => ({
      value: cat,
      label: cat
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));
  }, [categorias]);

  const temFiltrosAtivos = categoriaFiltro !== '';

  return (
    <div className="filtros-container">
      <div className="filtros-header">
        <Filter size={20} />
        <h3>Filtrar por Categoria</h3>
        {temFiltrosAtivos && (
          <button
            className="btn-limpar-filtros"
            onClick={limparFiltros}
            aria-label="Limpar filtros"
          >
            <X size={16} />
            Limpar
          </button>
        )}
      </div>

      <div className="filtros-categorias">
        <button
          className={`filtro-categoria ${categoriaFiltro === '' ? 'ativo' : ''}`}
          onClick={() => atualizarFiltroCategoria('')}
        >
          Todas
        </button>
        {categoriasUnicas.map((categoria) => (
          <button
            key={categoria.value}
            className={`filtro-categoria ${
              categoriaFiltro === categoria.value ? 'ativo' : ''
            }`}
            onClick={() => atualizarFiltroCategoria(categoria.value)}
          >
            {categoria.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filtros;

