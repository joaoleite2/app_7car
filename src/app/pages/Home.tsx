import React, { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { Link, useHistory } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { CiCirclePlus } from 'react-icons/ci';
import { Slogan } from '../components/Slogan';

interface Product {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  stock: number;
}

export const Home = (props: { pEmail: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [showFooter, setShowFooter] = useState(true); // Estado para controlar o footer
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8080/product')
      .then((response) => response.json())
      .then((data) => {
        const adjustedProducts: Product[] = data
          .filter((product: any) => product.qtnEstoque_Prod > 0)
          .map((product: any) => ({
            id: product.id_Prod,
            name: product.nome_Prod,
            imageSrc: product.imagem_Prod || 'url_da_sua_imagem_padrao_se_nao_houver',
            imageAlt: product.nome_Prod,
            price: `R$${parseFloat(product.preco_Prod).toFixed(2)}`,
            stock: product.qtnEstoque_Prod,
          }));
        setProducts(adjustedProducts);
        setFilteredProducts(adjustedProducts); // Inicializa com todos os produtos
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const handleCreateProduct = () => {
    history.push('/create-product');
  };

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
    setFilteredProducts(filtered);
    setShowNotFoundMessage(filtered.length === 0); // Mostra a mensagem se nenhum produto for encontrado
    setShowFooter(filtered.length > 0); // Mostra o footer se houver produtos filtrados
  };

  return (
    <>
      <Nav onSearch={handleSearch} />
      <Slogan />
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="font-bold text-2xl">
            {props.pEmail ? `Olá ${props.pEmail}` : (
              <button className="flex items-center gap-1 font-bold text-red-500" onClick={handleCreateProduct}>
                Criar <CiCirclePlus className="text-2xl" />
              </button>
            )}
          </h1>
          {showNotFoundMessage && (
            <p className="mt-4 text-red-500 text-3xl font-semibold">Produto não encontrado.</p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="group relative shadow-md">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-md text-gray-700 font-bold">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {showFooter && <Footer />}
    </>
  );
};
