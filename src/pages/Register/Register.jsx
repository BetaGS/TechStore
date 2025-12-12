import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

// Schema de validação com Zod
const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(50, 'Nome muito longo'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha muito longa')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await registerUser(data.name, data.email, data.password);
      if (result.success) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Erro no registro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Criar Conta</h1>
          <p>Preencha os dados para começar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* Campo Nome */}
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                {...register('name')}
                className={errors.name ? 'input-error' : ''}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

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
                autoComplete="new-password"
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
            <div className="password-hints">
              <small>A senha deve conter: maiúscula, minúscula e número</small>
            </div>
          </div>

          {/* Campo Confirmar Senha */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'input-error' : ''}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Criando conta...'
            ) : (
              <>
                <UserPlus size={20} />
                Criar Conta
              </>
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="divider">
          <span>ou</span>
        </div>

        {/* Link para Login */}
        <div className="register-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="login-link">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

