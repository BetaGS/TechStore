import './Sobre/Sobre.css';

function Sobre() {
  return (
    <div className="sobre-container">
      <h1>Sobre a TechStore</h1>
      <p>
        A TechStore é sua parceira número um em tecnologia. Somos especialistas
        em produtos tech, trazendo as últimas inovações de hardware, periféricos
        e gadgets para transformar o seu setup e o seu dia a dia.
      </p>

      <div className="sobre-imagem">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
          alt="Escritório da TechStore"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Sobre;
