import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

// Schema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha muito longa'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        // Redireciona para a rota que tentou acessar ou para home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className={errors.email ? 'input-error' : ''}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Campo Senha */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'input-error' : ''}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          {/* Link Esqueci a Senha */}
          <div className="form-options">
            <Link to="/forgot-password" className="forgot-link">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Entrando...'
            ) : (
              <>
                <LogIn size={20} />
                Entrar
              </>
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="divider">
          <span>ou</span>
        </div>

        {/* Link para Registro */}
        <div className="login-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/register" className="register-link">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

