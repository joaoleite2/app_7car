import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { Nav } from "../../../components/Nav";

interface Model {
  id_Modelo: number;
  nome_Modelo: string;
  id_Marca: number;
}

interface ProductType {
  id_Tipo: number;
  nome_Tipo: string;
}

interface Brand {
  id_Marca: number;
  nome_Marca: string;
}

export const CreateProduct = (props: { pEmail: string }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    idModel: '',
    idProductType: '',
    idBrand: '',
    price: '',
    quantity: '',
    name: '',
    description: '',
    imageUrl: ''
  });
  const history = useHistory();

  useEffect(() => {
    // Fetch models, product types, and brands
    fetch("http://localhost:8080/model")
      .then((response) => response.json())
      .then((data) => setModels(data.filter((model: Model) => model.nome_Modelo)))
      .catch((error) => console.error("Erro ao buscar modelos:", error));

    fetch("http://localhost:8080/product-type")
      .then((response) => response.json())
      .then((data) => setProductTypes(data))
      .catch((error) => console.error("Erro ao buscar tipos de produtos:", error));

    fetch("http://localhost:8080/brand")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Erro ao buscar marcas:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Handle brand selection change
    if (name === "idBrand") {
      setSelectedBrand(Number(value));
      setFormData((prevData) => ({
        ...prevData,
        idModel: '', // Reset model selection
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      idModel: Number(formData.idModel),
      idProductType: Number(formData.idProductType),
      idBrand: Number(formData.idBrand),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    fetch("http://localhost:8080/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processedData),
    })
      .then((response) => {
        if (response.ok) {
          history.push("/");
        } else {
          console.error("Erro ao criar produto");
        }
      })
      .catch((error) => console.error("Erro ao criar produto:", error));
  };

  const handleAddModel = () => {
    if (!selectedBrand) {
      alert("Por favor, selecione uma marca antes de adicionar um modelo.");
      return;
    }
    
    const modelName = prompt("Digite o nome do novo modelo:");
    if (modelName) {
      fetch("http://localhost:8080/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: modelName, idBrand: selectedBrand }),
      })
        .then((response) => response.json())
        .then((newModel) => setModels((prevModels) => [...prevModels, newModel]))
        .catch((error) => console.error("Erro ao criar modelo:", error));
    }
  };

  const handleAddProductType = () => {
    const productTypeName = prompt("Digite o nome do novo tipo de produto:");
    if (productTypeName) {
      fetch("http://localhost:8080/product-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productType: productTypeName }),
      })
        .then((response) => response.json())
        .then((newProductType) => setProductTypes((prevProductTypes) => [...prevProductTypes, newProductType]))
        .catch((error) => console.error("Erro ao criar tipo de produto:", error));
    }
  };

  const handleAddBrand = () => {
    const brandName = prompt("Digite o nome da nova marca:");
    if (brandName) {
      fetch("http://localhost:8080/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand: brandName }),
      })
        .then((response) => response.json())
        .then((newBrand) => setBrands((prevBrands) => [...prevBrands, newBrand]))
        .catch((error) => console.error("Erro ao criar marca:", error));
    }
  };

  return (
    <>
      <Nav />
      <div className="bg-[#F5F5F5] min-h-screen min-w-full flex flex-col items-center">
        <div className="mx-auto w-1/3 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="font-bold text-2xl mb-8">Criar Produto</h1>
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

            <div className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Marca
              </label>
              <select
                name="idBrand"
                value={formData.idBrand}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              >
                <option value="" disabled>Selecione uma marca</option>
                {brands.map((brand) => (
                  <option key={brand.id_Marca} value={brand.id_Marca}>{brand.nome_Marca}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddBrand} className="flex items-center gap-1 font-bold text-red-500">
                Adicionar Marca <CiCirclePlus className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Modelo
              </label>
              <select
                name="idModel"
                value={formData.idModel}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
                disabled={!selectedBrand}
              >
                <option value="" disabled>Selecione um modelo</option>
                {models
                  .filter((model) => model.id_Marca === selectedBrand)
                  .map((model) => (
                    <option key={model.id_Modelo} value={model.id_Modelo}>{model.nome_Modelo}</option>
                  ))}
              </select>
              <button type="button" onClick={handleAddModel} className="flex items-center gap-1 font-bold text-red-500">
                Adicionar Modelo <CiCirclePlus className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Produto
              </label>
              <select
                name="idProductType"
                value={formData.idProductType}
                onChange={handleChange}
                required
                className="bg-white w-full py-2 px-1 outline-none rounded-lg focus:ring-2 ring-indigo-400"
              >
                <option value="" disabled>Selecione um tipo de produto</option>
                {productTypes.map((productType) => (
                  <option key={productType.id_Tipo} value={productType.id_Tipo}>{productType.nome_Tipo}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddProductType} className="flex items-center gap-1 font-bold text-red-500">
                Adicionar Tipo <CiCirclePlus className="text-2xl" />
              </button>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500"
            >
              Criar Produto
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
