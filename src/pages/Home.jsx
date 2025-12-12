import { useState, useEffect, useMemo } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { useBusca } from '../context/BuscaContext';
import CardProduto from '../Components/CardProduto/CardProduto';
import SkeletonCard from '../Components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import Filtros from '../Components/Filtros/Filtros';
import { API_BASE_URL, TAXA_CONVERSAO_DOLAR } from '../constants';
import { Search } from 'lucide-react';
import './Home.css';

function Home() {
  const { adicionarAoCarrinho } = useCarrinho();
  const { termoBusca, categoriaFiltro } = useBusca();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        setLoading(true);
        setErro(null);
        const res = await fetch(`${API_BASE_URL}/products`);

        if (!res.ok) throw new Error('Falha ao buscar produtos');

        const data = await res.json();

        const produtosFormatados = data.products.map((p) => ({
          id: p.id,
          nome: p.title,
          preco: p.price * TAXA_CONVERSAO_DOLAR,
          imagem: p.thumbnail,
          categoria: p.category,
        }));

        setProdutos(produtosFormatados);
      } catch (erro) {
        console.error('Erro:', erro);
        setErro('Erro ao carregar produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    buscarDados();
  }, []);

  // Filtrar produtos baseado em busca e categoria
  const produtosFiltrados = useMemo(() => {
    let filtrados = produtos;

    // Filtro por categoria
    if (categoriaFiltro) {
      filtrados = filtrados.filter(
        (produto) => produto.categoria === categoriaFiltro
      );
    }

    // Filtro por busca (nome)
    if (termoBusca.trim()) {
      const termoLower = termoBusca.toLowerCase().trim();
      filtrados = filtrados.filter((produto) =>
        produto.nome.toLowerCase().includes(termoLower)
      );
    }

    return filtrados;
  }, [produtos, categoriaFiltro, termoBusca]);

  // Extrair categorias únicas dos produtos
  const categorias = useMemo(() => {
    return produtos.map((p) => p.categoria);
  }, [produtos]);

  if (loading) {
    return (
      <div className="home-container">
        <div className="produtos-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <ErrorMessage
        mensagem={erro}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const temResultados = produtosFiltrados.length > 0;
  const temFiltros = termoBusca.trim() || categoriaFiltro;

  return (
    <div className="home-container">
      {/* Filtros */}
      <Filtros categorias={categorias} />

      {/* Resultados da Busca */}
      {temFiltros && (
        <div className="resultados-busca">
          <div className="resultados-info">
            <span className="resultados-count">
              {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </span>
            {termoBusca.trim() && (
              <span className="termo-busca">
                para "{termoBusca}"
              </span>
            )}
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      {temResultados ? (
        <div className="produtos-grid">
          {produtosFiltrados.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          ))}
        </div>
      ) : (
        <div className="sem-resultados">
          <Search size={64} className="sem-resultados-icon" />
          <h2>Nenhum produto encontrado</h2>
          <p>
            {temFiltros
              ? 'Tente ajustar os filtros ou termo de busca'
              : 'Não há produtos disponíveis no momento'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
