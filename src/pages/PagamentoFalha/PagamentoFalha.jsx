import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import './PagamentoFalha.css';

function PagamentoFalha() {
  return (
    <div className="pagamento-falha-container">
      <div className="pagamento-falha-card">
        <div className="error-icon">
          <XCircle size={80} />
        </div>
        
        <h1>Pagamento Não Processado</h1>
        <p className="error-message">
          Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente ou escolha outro método de pagamento.
        </p>

        <div className="error-actions">
          <Link to="/checkout" className="btn-tentar-novamente">
            <RefreshCw size={20} />
            Tentar Novamente
          </Link>
          <Link to="/carrinho" className="btn-voltar">
            <ArrowLeft size={20} />
            Voltar ao Carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PagamentoFalha;

