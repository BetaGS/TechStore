import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';
import { API_BASE_URL, TAXA_CONVERSAO_DOLAR } from '../constants';
import { formatarPreco, formatarParcelamento } from '../utils/formatters';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import './ProdutoDetalhe/ProdutoDetalhe.css';

function ProdutoDetalhe() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState('');

  const safeId = id || '1';

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        setErro(null);
        const res = await fetch(`${API_BASE_URL}/products/${safeId}`);

        if (!res.ok) throw new Error('Falha ao buscar produto');

        const data = await res.json();

        const produtoFormatado = {
          ...data,
          precoBrl: data.price * TAXA_CONVERSAO_DOLAR,
          precoAntigoBrl: data.price * TAXA_CONVERSAO_DOLAR * 1.2,
          imagens: data.images || [data.thumbnail],
        };

        setProduto(produtoFormatado);
        setImagemAtiva(data.thumbnail);
      } catch (err) {
        setErro('Produto não encontrado ou erro na conexão.');
        console.error('Erro ao buscar produto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
    window.scrollTo(0, 0);
  }, [safeId]);

  // Função auxiliar para padronizar o objeto antes de enviar pro carrinho
  const handleAdicionar = () => {
    const itemParaCarrinho = {
      id: produto.id,
      nome: produto.title,
      preco: produto.precoBrl,
      imagem: produto.thumbnail,
      categoria: produto.category,
    };

    adicionarAoCarrinho(itemParaCarrinho);
  };

  // Memoizar cálculos de preço
  const precoFormatado = useMemo(
    () => (produto ? formatarPreco(produto.precoBrl) : ''),
    [produto]
  );

  const precoAntigoFormatado = useMemo(
    () => (produto ? formatarPreco(produto.precoAntigoBrl) : ''),
    [produto]
  );

  const parcelamentoFormatado = useMemo(
    () => (produto ? formatarParcelamento(produto.precoBrl, 12) : ''),
    [produto]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (erro || !produto) {
    return (
      <ErrorMessage
        mensagem={erro || 'Produto não encontrado'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="produto-container">
      <Link to="/" className="btn-voltar" aria-label="Voltar para a página inicial">
        <ArrowLeft size={20} aria-hidden="true" />
        Voltar para a vitrine
      </Link>

      <div className="produto-grid">
        {/* COLUNA 1: Galeria */}
        <div className="galeria-container">
          <div className="imagem-principal-wrapper">
            <img
              src={imagemAtiva}
              alt={produto.title}
              className="imagem-principal"
              loading="eager"
            />
          </div>

          <div className="thumbnails-lista" role="list">
            {produto.imagens.map((img, index) => (
              <button
                key={index}
                className={`thumb-btn ${imagemAtiva === img ? 'ativo' : ''}`}
                onClick={() => setImagemAtiva(img)}
                onMouseEnter={() => setImagemAtiva(img)}
                aria-label={`Ver imagem ${index + 1} do produto`}
                role="listitem"
              >
                <img 
                  src={img} 
                  alt={`Vista ${index + 1} do ${produto.title}`} 
                  className="thumb-img"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA 2: Informações */}
        <div className="info-container">
          <div>
            <span className="produto-marca">
              {produto.brand || produto.category}
            </span>
            <h1 className="produto-titulo">{produto.title}</h1>

            <div className="avaliacao-box" role="img" aria-label={`Avaliação: ${produto.rating} de 5 estrelas`}>
              <Star fill="#fbbf24" stroke="none" size={20} aria-hidden="true" />
              <span style={{ fontWeight: 'bold', color: 'white' }}>
                {produto.rating}
              </span>
              <span className="nota-texto">(128 avaliações)</span>
            </div>
          </div>

          <div className="preco-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="preco-antigo">
                {precoAntigoFormatado}
              </span>
              <span className="desconto-badge">20% OFF</span>
            </div>

            <span className="preco-atual">
              {precoFormatado}
            </span>

            <span className="parcelamento">
              em até 12x de {parcelamentoFormatado} sem juros
            </span>
          </div>

          <div className="descricao-box">
            <p className="descricao">{produto.description}</p>
          </div>

          <button 
            className="btn-comprar" 
            onClick={handleAdicionar}
            aria-label={`Adicionar ${produto.title} ao carrinho`}
          >
            <ShoppingCart size={24} aria-hidden="true" />
            ADICIONAR AO CARRINHO
          </button>

          <div className="badges-confianca">
            <div className="badge-item">
              <Truck size={24} color="#646cff" aria-hidden="true" />
              <div className="badge-texto">
                <strong>Frete Grátis</strong>
                <span>Para todo o Brasil</span>
              </div>
            </div>
            <div className="badge-item">
              <ShieldCheck size={24} color="#646cff" aria-hidden="true" />
              <div className="badge-texto">
                <strong>Garantia Total</strong>
                <span>30 dias para devolução</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoDetalhe;
