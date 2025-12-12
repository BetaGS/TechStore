import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingSpinner;

