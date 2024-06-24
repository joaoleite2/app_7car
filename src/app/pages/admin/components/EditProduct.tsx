import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Nav } from "../../../components/Nav";

interface FormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  idBrand: string;
  idModel: string;
  idProductType: string;
}

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
    idBrand: "",
    idModel: "",
    idProductType: ""
  });
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: data.nome_Prod,
          description: data.desc_Prod,
          price: parseFloat(data.preco_Prod),
          quantity: data.qtnEstoque_Prod,
          imageUrl: data.imagem_Prod,
          idBrand: data.id_Marca,
          idModel: data.id_Modelo,
          idProductType: data.id_Tipo,
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar o produto:', error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "quantity" ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:8080/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      if (response.ok) {
        history.push(`/product/${id}`);
      } else {
        console.error('Erro ao atualizar o produto:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Erro ao atualizar o produto:', error);
    });
  };

  return (
    <>
      <Nav />
      <div className="bg-[#F5F5F5] min-h-screen min-w-full flex flex-col items-center">
        <div className="mx-auto w-1/3 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="font-bold text-2xl mb-8">Editar Produto</h1>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Nome do Produto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Quantidade em estoque
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              />
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500"
            >
              Atualizar Produto
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
