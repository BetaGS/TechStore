import { AlertCircle } from 'lucide-react';
import './ErrorMessage.css';

export const ErrorMessage = ({ mensagem, onRetry }) => {
  return (
    <div className="error-message-container">
      <AlertCircle size={48} className="error-icon" />
      <h2>Ops! Algo deu errado.</h2>
      <p>{mensagem}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-retry-btn">
          Tentar Novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

