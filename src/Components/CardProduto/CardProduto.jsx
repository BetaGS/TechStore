import { useState, memo, useCallback } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import './CardProduto.css';
import { Link } from 'react-router-dom';
import { formatarPreco } from '../../utils/formatters';

// Componente memoizado para evitar re-renders desnecessários
const CardProduto = memo(({ produto, adicionarAoCarrinho }) => {
  const [favorito, setFavorito] = useState(false);

  // Memoizar preço formatado
  const precoFormatado = formatarPreco(produto.preco);

  // Callback memoizado para mudar favorito
  const mudarFavorito = useCallback(() => {
    setFavorito((prev) => !prev);
  }, []);

  // Callback memoizado para adicionar ao carrinho
  const handleAdicionar = useCallback(() => {
    adicionarAoCarrinho(produto);
  }, [produto, adicionarAoCarrinho]);

  return (
    <div className="card">
      <div className="card-content">
        <Link to={`/produto/${produto.id}`} aria-label={`Ver detalhes de ${produto.nome}`}>
          <div className="card-img-wrapper">
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              loading="lazy"
            />
          </div>
          <span className="card-category">{produto.categoria}</span>
          <h3 className="card-title">{produto.nome}</h3>
          <p className="card-price">{precoFormatado}</p>
        </Link>

        <button
          className="btn-comprar"
          onClick={handleAdicionar}
          aria-label={`Adicionar ${produto.nome} ao carrinho`}
        >
          <ShoppingBag size={18} aria-hidden="true" />
          Adicionar
        </button>

        <button
          className="btn-favorito"
          onClick={mudarFavorito}
          aria-label={favorito ? `Remover ${produto.nome} dos favoritos` : `Adicionar ${produto.nome} aos favoritos`}
        >
          <Heart
            size={25}
            color={favorito ? 'red' : 'gray'}
            fill={favorito ? 'red' : 'none'}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
});

CardProduto.displayName = 'CardProduto';

export default CardProduto;
