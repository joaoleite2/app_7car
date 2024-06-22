// src/components/Cart.tsx

import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "./contexts/CartContext";
import { Nav } from "./Nav";

interface CartItemType {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const handleIncrement = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrement = () => onQuantityChange(item.id, item.quantity - 1);

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img src={item.imageSrc} alt={item.imageAlt} className="w-16 h-16 object-cover" />
      <div className="ml-4 flex-grow">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-500">{`R$${item.price.toFixed(2)}`}</p>
      </div>
      <div className="flex items-center">
        <button onClick={handleDecrement} disabled={item.quantity <= 1}>
          <FaMinus />
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{`R$${(item.price * item.quantity).toFixed(2)}`}</p>
        <button onClick={() => onRemove(item.id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, total } = useCart();

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4 md:p-20">
        <h1 className="text-4xl font-bold mb-4">Carrinho de Compras</h1>
        {cartItems.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onQuantityChange={updateQuantity} 
            onRemove={removeFromCart} 
          />
        ))}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold">Total: R${total.toFixed(2)}</h2>
          {!isCartEmpty && (
            <Link to="/checkout">
              <button className="px-4 py-2 bg-red-600 text-white rounded">Finalizar Compra</button>
            </Link>
          )}
        </div>
        {isCartEmpty && (
          <p className="mt-4">Seu carrinho está vazio.</p>
        )}
      </div>
    </>
  );
};

export default Cart;
