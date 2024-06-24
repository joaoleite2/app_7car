import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Contact } from './pages/Contact';
import { Admin } from './pages/admin/Admin';
import { CreateProduct } from './pages/admin/components/CreateProduct';
import { EditProduct } from './pages/admin/components/EditProduct';
import { CartProvider } from './components/contexts/CartContext';
import Cart from './components/Cart';

function App() {
  const [email, setEmail] = useState('');

  // useEffect(()=>{
  //   (
  //     async ()=>{
  //       const response = await fetch('http://localhost:8080/auth/user',{
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //       });
  //       const content = await response.json();
  //       setEmail(content.email_Usu);
  //     }
  //   )();
  // })

  return (
    <>
      <CartProvider>
        <Route path='/' exact component={() => <Home pEmail={email} />} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/product/:id' component={(props: any) => <Product {...props} email={email} />} />
        <Route path="/edit-product/:id" component={EditProduct} />
        <Route path='/contact' component={Contact} />
        <Route path='/admin' component={Admin} />
        <Route path="/create-product" component={CreateProduct} />
        <Route path="/cart" component={Cart} />
      </CartProvider>
    </>
  );
}

export default App;