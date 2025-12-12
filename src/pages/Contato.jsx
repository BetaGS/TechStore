import './Contato/Contato.css';

function Contato() {
  return (
    <div className="contato-container">
      <h1>Fale Conosco</h1>
      <p>Estamos à disposição para tirar suas dúvidas.</p>

      <ul className="contato-lista">
        <li>
          <strong>✉️ Email:</strong> contato@techstore.com
        </li>
        <li>
          <strong>📞 Telefone:</strong> (11) 99999-9999
        </li>
        <li>
          <strong>📍 Endereço:</strong> Rua da Tecnologia, 123 - São Paulo
        </li>
      </ul>
    </div>
  );
}

export default Contato;
