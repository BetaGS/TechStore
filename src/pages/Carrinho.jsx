import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Frown } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';
import { formatarPreco } from '../utils/formatters';
import './Carrinho/Carrinho.css';

function Carrinho() {
  const { carrinho, removerDoCarrinho, valorTotal } = useCarrinho();
  const navigate = useNavigate();

  // Usando useMemo para calcular o total apenas quando o carrinho mudar
  const total = useMemo(() => valorTotal, [valorTotal]);

  const handleFinalizar = () => {
    if (carrinho.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="carrinho-container">
      <h1 className="carrinho-titulo">
        <ShoppingBag size={32} aria-hidden="true" />
        Meu Carrinho
      </h1>

      {carrinho.length === 0 ? (
        <div className="carrinho-vazio">
          <Frown size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} aria-hidden="true" />
          <h2>Seu carrinho está vazio</h2>
          <p>Que tal dar uma olhada nas nossas ofertas?</p>
          <Link to="/" className="btn-voltar">
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div className="carrinho-grid">
          {/* Esquerda: Lista de Itens */}
          <div className="lista-itens">
            {carrinho.map((item, index) => (
              <div key={`${item.id}-${index}`} className="item-card">
                <img 
                  src={item.imagem} 
                  alt={`Imagem do produto ${item.nome}`} 
                  className="item-img"
                  loading="lazy"
                />
                
                <div className="item-info">
                  <div className="item-nome">{item.nome}</div>
                  <div className="item-cat">{item.categoria}</div>
                  <div className="item-preco">{formatarPreco(item.preco)}</div>
                </div>

                <button 
                  className="btn-remover"
                  onClick={() => removerDoCarrinho(index)}
                  aria-label={`Remover ${item.nome} do carrinho`}
                  title="Remover item"
                >
                  <Trash2 size={20} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Direita: Resumo */}
          <div className="resumo-box">
            <h3>Resumo do Pedido</h3>
            
            <div className="resumo-linha">
              <span>Subtotal ({carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'})</span>
              <span>{formatarPreco(total)}</span>
            </div>
            
            <div className="resumo-linha">
              <span>Frete</span>
              <span style={{ color: '#4ade80' }}>Grátis</span>
            </div>

            <div className="resumo-total">
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>

            <button 
              className="btn-finalizar"
              onClick={handleFinalizar}
              aria-label="Finalizar compra"
            >
              Finalizar Compra
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
