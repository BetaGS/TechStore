import { Link } from 'react-router-dom';
import './NotFound/NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link to="/" className="not-found-link">
        <button className="not-found-button">Voltar para Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
