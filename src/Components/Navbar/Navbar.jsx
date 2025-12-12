import { useState, memo, useCallback, useEffect, useRef } from 'react';
import { ShoppingCart, User, Search, Menu, LogOut, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useAuth } from '../../context/AuthContext';
import { useBusca } from '../../context/BuscaContext';
import './Navbar.css';

// Componente memoizado
const Navbar = memo(() => {
  const { itensNoCarrinho } = useCarrinho();
  const { user, isAuthenticated, logout } = useAuth();
  const { termoBusca, atualizarBusca } = useBusca();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Redirecionar para home quando buscar (se não estiver na home)
  const handleBusca = useCallback((e) => {
    const valor = e.target.value;
    atualizarBusca(valor);
    
    // Se não estiver na home, redirecionar
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [atualizarBusca, navigate, location.pathname]);

  const limparBusca = useCallback(() => {
    atualizarBusca('');
  }, [atualizarBusca]);

  const handleLogout = useCallback(() => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  }, [logout, navigate]);

  return (
    <nav className="navbar" role="navigation" aria-label="Navegação principal">
      {/* 1. Logo */}
      <div className="logo">
        <Link to="/" aria-label="Ir para a página inicial">
          <h1>TechStore</h1>
        </Link>
      </div>

      {/* 2. Links */}
      <ul className="nav-links" role="list">
        <li role="listitem">
          <Link to="/">Home</Link>
        </li>
        <li role="listitem">
          <Link to="/sobre">Sobre</Link>
        </li>
        <li role="listitem">
          <Link to="/contato">Contato</Link>
        </li>
      </ul>

      {/* 3. Ações */}
      <div className="nav-actions">
        {/* Barra de Busca */}
        <div className="search-box">
          <Search size={20} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={termoBusca}
            onChange={handleBusca}
            aria-label="Campo de busca de produtos"
          />
          {termoBusca && (
            <button
              className="search-clear"
              onClick={limparBusca}
              aria-label="Limpar busca"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Menu do Usuário ou Botão de Login */}
        {isAuthenticated ? (
          <div className="user-menu-wrapper" ref={menuRef}>
            <button
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Menu do usuário"
              aria-expanded={showUserMenu}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'Usuário'}
                  className="user-avatar"
                />
              ) : (
                <User size={24} aria-hidden="true" />
              )}
            </button>
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  {user?.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name || 'Usuário'}
                      className="user-avatar-large"
                    />
                  )}
                  <div className="user-menu-info">
                    <p className="user-menu-name">{user?.name || 'Usuário'}</p>
                    <p className="user-menu-email">{user?.email}</p>
                  </div>
                </div>
                <div className="user-menu-divider"></div>
                <button
                  className="user-menu-item"
                  onClick={handleLogout}
                  aria-label="Fazer logout"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" aria-label="Fazer login">
            <button className="icon-btn login-btn" title="Fazer Login">
              <User size={24} aria-hidden="true" />
            </button>
          </Link>
        )}

        {/* Ícone de Carrinho com Badge */}
        <Link to="/carrinho" aria-label={`Ir para o carrinho. ${itensNoCarrinho} ${itensNoCarrinho === 1 ? 'item' : 'itens'} no carrinho`}>
          <button className="icon-btn" title="Carrinho de compras" aria-label="Carrinho de compras">
            <ShoppingCart size={24} aria-hidden="true" />
            {itensNoCarrinho > 0 && (
              <span className="cart-badge" aria-label={`${itensNoCarrinho} itens no carrinho`}>
                {itensNoCarrinho}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
