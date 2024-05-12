import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Home } from './pages/Home';

function App() {
  
  const [email,setEmail] = useState('');
  useEffect(()=>{
    (
      async ()=>{
        const response = await fetch('http://localhost:8080/auth/user',{
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const content = await response.json();
        setEmail(content.email_Usu);
      }
    )();
  })
  return (
    <>
      <BrowserRouter>
          <Route path='/' exact component={()=><Home pEmail={email} / >}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
      </BrowserRouter>
    </>
  );
}

export default App;
