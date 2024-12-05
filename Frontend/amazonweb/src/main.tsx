import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './routes/Inicio';
import Registro from './routes/login/Registro';

import Login from './routes/login/Login';
import Login_de_contraseña from './routes/login/contraseña';

import Corporativa from './routes/corporativa';
import Negocio from './routes/corporativa_negocio';
import Envio from './routes/corporativa_envio';
import Idioma from './routes/idioma';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/registro',
    element: <Registro />,
  },

  {
    path: '/corporativo',
    element: <Corporativa />,
  },

  {
    path: '/corporativo/negocio',
    element: <Negocio />,
  },

  {
    path: '/corporativo/negocio/envio',
    element: <Envio />,
  },

  {
    path: '/idioma',
    element: <Idioma />,
  },

  {
    path: '/login/contraseña',
    element: <Login_de_contraseña />,	
  }


])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)