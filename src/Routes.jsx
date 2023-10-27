import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './components'
import { routes } from '@/utils/routes'
import { useSelector } from 'react-redux'
import Fondeos from './app/pages/Fondeos'
import HomePage from './app/pages/HomePage'
import Login from './app/modules/Auth/pages/Login'
import Recaudos from './app/pages/Recaudos'
import ColectivaAuto from './app/pages/ColectivaAuto'
import ColectivaVida from './app/pages/ColectivaVida'
import ControlSeguros from './app/pages/ControlSeguros'
import Facturas from './app/pages/Facturas'
import SegurosAutos from './app/pages/SegurosAutos'
import SegurosVida from './app/pages/SegurosVida'
import NegociosDesembolsados from './app/pages/NegociosDesembolsados'
const publicRoutes = [
  {
    path: routes.login,
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to={routes.login} />
  }
]

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: routes.home,
        element: <HomePage />
      },
      {
        path: routes.recaudos,
        element: <Recaudos />
      },
      {
        path: routes.fondeo,
        element: <Fondeos />
      },
      {
        path: routes.facturas,
        element: <Facturas />
      },
      {
        path: routes.colectivas,
        element: <HomePage />
      },
      {
        path: routes.autos,
        element: <ColectivaAuto />
      },
      {
        path: routes.vida,
        element: <ColectivaVida />
      },
      {
        path: routes.reportes,
        element: <HomePage />
      },
      {
        path: routes.segurosAutos,
        element: <SegurosAutos />
      },
      {
        path: routes.segurosVida,
        element: <SegurosVida />
      },
      {
        path: routes.negocios,
        element: <NegociosDesembolsados />
      },
      {
        path: routes.controlSeguros,
        element: <ControlSeguros />
      },
      {
        path: '*',
        element: <Navigate to={routes.home} />
      }
    ]
  }
]

function Routes() {
  const user = useSelector((auth) => auth.auth.user)

  const routes = user ? privateRoutes : publicRoutes
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default Routes
