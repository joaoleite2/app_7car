// src/pages/Product.tsx

import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useCart } from "../components/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number; // Mudei o tipo para number para facilitar o cálculo
  brand: string;
  model: string;
  description: string;
}

export const Product = (props: { email: string }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { addToCart } = useCart(); // Obtendo a função addToCart do contexto do carrinho

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const adjustedProduct: Product = {
          id: data.id_Prod,
          name: data.nome_Prod,
          imageSrc: data.imagem_Prod || 'url_da_sua_imagem_padrao_se_nao_houver',
          imageAlt: data.nome_Prod,
          price: parseFloat(data.preco_Prod),
          brand: data.marca,
          model: data.modelo,
          description: data.desc_Prod,
        };
        setProduct(adjustedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar o produto:', error);
        setLoading(false);
      });
  }, [id]);

  const handleEditProduct = () => {
    history.push(`/edit-product/${id}`);
  };


  const handleAddToCart = () => {
    if (product) {
      alert('Produto adicionado ao carrinho');
      addToCart({ ...product, quantity: 1 }); 
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <>
      <Nav />
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <button onClick={handleEditProduct} className="text-3xl text-red-700">
            <FaEdit />
          </button>
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start max-w-xl">
                <img className="h-full w-full max-w-full object-cover" src={product.imageSrc} alt={product.imageAlt} />
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

              <div className="mt-5 flex items-center">
                <p className="ml-2 text-sm font-medium text-gray-500">TOTAL VENDIDOS</p>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <h1 className="text-3xl font-bold">R${product.price.toFixed(2)}</h1>
                {props.email ? (
                  <button onClick={handleAddToCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    + Adicione ao carrinho
                  </button>
                ) : (
                  <Link to='/login'>
                    <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      + Adicione ao carrinho
                    </button>
                  </Link>
                )}
              </div>
              <div className="lg:col-span-3">
                <div className="mt-8 flow-root sm:mt-12">
                  <h1 className="text-lg mb-4"><span className="font-semibold">Marca:</span> <p className="font-medium uppercase">{product.brand}</p></h1>
                  <h1 className="text-lg mb-4"><span className="font-semibold">Modelo:</span> <p className="font-medium uppercase">{product.model}</p></h1>
                  <h1 className="text-3xl font-bold mt-8">Descrição</h1>
                  <p className="mt-2">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
