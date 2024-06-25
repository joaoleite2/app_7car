// src/components/PrivateRoute.tsx

import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAdmin: boolean; // Remova isso, pois isAdmin vem do contexto
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
