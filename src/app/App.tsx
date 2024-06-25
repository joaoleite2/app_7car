import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Product } from './pages/Product';
import { Contact } from './pages/Contact';
import { Admin } from './pages/admin/Admin';
import { CreateProduct } from './pages/admin/components/CreateProduct';
import { EditProduct } from './pages/admin/components/EditProduct';
import { CartProvider } from './components/contexts/CartContext';
import Cart from './components/Cart';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './components/contexts/AuthContext';

function App() {
  const [key, setKey] = useState(0); // Adiciona uma chave de estado
  const { isAdmin } = useAuth(); // Obtém o estado de autenticação do contexto

  useEffect(() => {
    // Atualiza a chave sempre que o estado de isAdmin mudar
    setKey((prevKey) => prevKey + 1);
  }, [isAdmin]);

  return (
    <BrowserRouter>
      <CartProvider>
        <Route key={key} path='/' exact component={() => <Home key={key} />} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/product/:id' component={Product} />
        <PrivateRoute path='/edit-product/:id' component={EditProduct} isAdmin={isAdmin} />
        <Route path='/contact' component={Contact} />
        <PrivateRoute path='/admin' component={Admin} isAdmin={isAdmin} />
        <PrivateRoute path="/create-product" component={CreateProduct} isAdmin={isAdmin} />
        <Route path="/cart" component={Cart} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
