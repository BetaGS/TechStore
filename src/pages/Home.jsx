import { useState, useEffect } from 'react';
import CardProduto from '../Components/CardProduto/CardProduto'; // Ajuste o caminho se necessário

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarDados() {
      try {
        // 1. MUDANÇA DE URL: Usando DummyJSON
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        // 2. CORREÇÃO DO ENVELOPE: Usamos 'data.products'
        // A DummyJSON retorna { products: [...], total: 100 }
        const produtosFormatados = data.products.map((p) => ({
          id: p.id,
          nome: p.title,
          preco: p.price * 5.5, // Conversão dólar
          imagem: p.thumbnail, // Dummy usa 'thumbnail'
          categoria: p.category,
        }));

        setProdutos(produtosFormatados);
      } catch (erro) {
        console.error('Erro:', erro);
      } finally {
        setLoading(false);
      }
    }
    buscarDados();
  }, []);

  if (loading) return <p>Carregando Vitrine...</p>;

  return (
    <div className="produtos-grid">
      {produtos.map((produto) => (
        <CardProduto
          key={produto.id}
          produto={produto}
          adicionarAoCarrinho={() => alert('Adicionado (Em breve)')}
        />
      ))}
    </div>
  );
}

export default Home;

