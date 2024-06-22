// src/app/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import Cart from './components/Cart';
import { CartProvider } from './components/contexts/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={Product} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </CartProvider>
  );
};

export default App;
