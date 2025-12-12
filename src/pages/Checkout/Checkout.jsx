import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  Mail, 
  User, 
  MapPin, 
  Phone, 
  Lock,
  ArrowLeft,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useAuth } from '../../context/AuthContext';
import { formatarPreco } from '../../utils/formatters';
import { processarPagamento } from '../../services/mercadoPagoService';
import toast from 'react-hot-toast';
import './Checkout.css';

// Schema de validação
const checkoutSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  cep: z.string().min(8, 'CEP inválido'),
  endereco: z.string().min(5, 'Endereço inválido'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  cidade: z.string().min(2, 'Cidade inválida'),
  estado: z.string().length(2, 'Estado deve ter 2 caracteres'),
});

function Checkout() {
  const { carrinho, valorTotal } = useCarrinho();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [erro, setErro] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: user?.name || '',
      email: user?.email || '',
    },
  });

  // Preencher dados do usuário se estiver logado
  useEffect(() => {
    if (user) {
      setValue('nome', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  // Redirecionar se carrinho estiver vazio
  useEffect(() => {
    if (carrinho.length === 0) {
      toast.error('Seu carrinho está vazio');
      navigate('/carrinho');
    }
  }, [carrinho, navigate]);

  const onSubmit = async (data) => {
    if (carrinho.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    setIsProcessing(true);
    setErro(null);

    try {
      const baseUrl = window.location.origin;
      const payer = {
        name: data.nome,
        email: data.email,
        phone: {
          number: data.telefone,
        },
        address: {
          street_name: data.endereco,
          street_number: parseInt(data.numero),
          zip_code: data.cep,
        },
      };

      await processarPagamento(carrinho, payer, baseUrl);
    } catch (error) {
      console.error('Erro no checkout:', error);
      setErro(error.message || 'Erro ao processar pagamento. Tente novamente.');
      toast.error('Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  if (carrinho.length === 0) {
    return null;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button
          className="btn-voltar-checkout"
          onClick={() => navigate('/carrinho')}
          aria-label="Voltar para o carrinho"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1>Finalizar Compra</h1>
      </div>

      <div className="checkout-grid">
        {/* Formulário */}
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
            {/* Dados Pessoais */}
            <section className="form-section">
              <h2>
                <User size={20} />
                Dados Pessoais
              </h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome Completo *</label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    {...register('nome')}
                    className={errors.nome ? 'input-error' : ''}
                  />
                  {errors.nome && (
                    <span className="error-message">{errors.nome.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register('email')}
                      className={errors.email ? 'input-error' : ''}
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    {...register('telefone')}
                    className={errors.telefone ? 'input-error' : ''}
                  />
                </div>
                {errors.telefone && (
                  <span className="error-message">{errors.telefone.message}</span>
                )}
              </div>
            </section>

            {/* Endereço */}
            <section className="form-section">
              <h2>
                <MapPin size={20} />
                Endereço de Entrega
              </h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cep">CEP *</label>
                  <input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    maxLength={9}
                    {...register('cep')}
                    className={errors.cep ? 'input-error' : ''}
                  />
                  {errors.cep && (
                    <span className="error-message">{errors.cep.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="estado">Estado *</label>
                  <input
                    id="estado"
                    type="text"
                    placeholder="SP"
                    maxLength={2}
                    {...register('estado')}
                    className={errors.estado ? 'input-error' : ''}
                  />
                  {errors.estado && (
                    <span className="error-message">{errors.estado.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade *</label>
                <input
                  id="cidade"
                  type="text"
                  placeholder="Sua cidade"
                  {...register('cidade')}
                  className={errors.cidade ? 'input-error' : ''}
                />
                {errors.cidade && (
                  <span className="error-message">{errors.cidade.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="endereco">Endereço *</label>
                <input
                  id="endereco"
                  type="text"
                  placeholder="Rua, Avenida, etc."
                  {...register('endereco')}
                  className={errors.endereco ? 'input-error' : ''}
                />
                {errors.endereco && (
                  <span className="error-message">{errors.endereco.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numero">Número *</label>
                  <input
                    id="numero"
                    type="text"
                    placeholder="123"
                    {...register('numero')}
                    className={errors.numero ? 'input-error' : ''}
                  />
                  {errors.numero && (
                    <span className="error-message">{errors.numero.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="complemento">Complemento</label>
                  <input
                    id="complemento"
                    type="text"
                    placeholder="Apto, Bloco, etc."
                    {...register('complemento')}
                  />
                </div>
              </div>
            </section>

            {/* Erro geral */}
            {erro && (
              <div className="error-box">
                <AlertCircle size={20} />
                <span>{erro}</span>
              </div>
            )}

            {/* Botão de Pagamento */}
            <button
              type="submit"
              className="btn-pagar"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner-small"></div>
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Ir para Pagamento
                </>
              )}
            </button>
          </form>
        </div>

        {/* Resumo do Pedido */}
        <div className="checkout-summary">
          <div className="summary-card">
            <h2>
              <ShoppingBag size={20} />
              Resumo do Pedido
            </h2>

            <div className="summary-items">
              {carrinho.map((item, index) => (
                <div key={`${item.id}-${index}`} className="summary-item">
                  <img src={item.imagem} alt={item.nome} />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.nome}</p>
                    <p className="summary-item-price">{formatarPreco(item.preco)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatarPreco(valorTotal)}</span>
              </div>
              <div className="summary-line">
                <span>Frete</span>
                <span style={{ color: 'var(--color-success)' }}>Grátis</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatarPreco(valorTotal)}</span>
              </div>
            </div>

            <div className="payment-security">
              <Lock size={16} />
              <small>Pagamento seguro via Mercado Pago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

