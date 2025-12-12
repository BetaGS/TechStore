import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { AuthProvider } from './context/AuthContext';
import { BuscaProvider } from './context/BuscaContext';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Navbar from './Components/Navbar/Navbar';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import './App.css';

// Lazy loading de rotas
const Home = lazy(() => import('./pages/Home'));
const Carrinho = lazy(() => import('./pages/Carrinho'));
const Contato = lazy(() => import('./pages/Contato'));
const Sobre = lazy(() => import('./pages/Sobre'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProdutoDetalhe = lazy(() => import('./pages/ProdutoDetalhe'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const PagamentoSucesso = lazy(() => import('./pages/PagamentoSucesso/PagamentoSucesso'));
const PagamentoFalha = lazy(() => import('./pages/PagamentoFalha/PagamentoFalha'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BuscaProvider>
          <CarrinhoProvider>
            <BrowserRouter>
            <Navbar />
            <div className="container-principal">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/carrinho" element={<Carrinho />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pagamento/sucesso" element={<PagamentoSucesso />} />
                  <Route path="/pagamento/falha" element={<PagamentoFalha />} />
                  <Route path="/sobre" element={<Sobre />} />
                  <Route path="/contato" element={<Contato />} />
                  <Route path="/produto/:id" element={<ProdutoDetalhe />} />
                  {/* Exemplo de rota protegida - descomente quando necessário */}
                  {/* <Route 
                    path="/perfil" 
                    element={
                      <ProtectedRoute>
                        <Perfil />
                      </ProtectedRoute>
                    } 
                  /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  border: '2px solid var(--color-border)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--color-success)',
                    secondary: 'var(--color-text-primary)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--color-error)',
                    secondary: 'var(--color-text-primary)',
                  },
                },
              }}
            />
            </BrowserRouter>
          </CarrinhoProvider>
        </BuscaProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
