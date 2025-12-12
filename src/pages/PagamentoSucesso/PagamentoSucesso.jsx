import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { useCarrinho } from '../../context/CarrinhoContext';
import { formatarPreco } from '../../utils/formatters';
import './PagamentoSucesso.css';

function PagamentoSucesso() {
  const [searchParams] = useSearchParams();
  const { limparCarrinho, valorTotal } = useCarrinho();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    // Limpar carrinho após pagamento bem-sucedido
    if (status === 'approved' || status === 'success') {
      limparCarrinho();
    }
  }, [status, limparCarrinho]);

  return (
    <div className="pagamento-sucesso-container">
      <div className="pagamento-sucesso-card">
        <div className="success-icon">
          <CheckCircle size={80} />
        </div>
        
        <h1>Pagamento Aprovado!</h1>
        <p className="success-message">
          Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
        </p>

        {paymentId && (
          <div className="payment-info">
            <p>
              <strong>ID do Pagamento:</strong> {paymentId}
            </p>
            <p>
              <strong>Status:</strong> {status === 'approved' ? 'Aprovado' : status}
            </p>
          </div>
        )}

        <div className="success-actions">
          <Link to="/" className="btn-home">
            <Home size={20} />
            Voltar para Home
          </Link>
          <Link to="/carrinho" className="btn-carrinho">
            <ShoppingBag size={20} />
            Ver Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PagamentoSucesso;

