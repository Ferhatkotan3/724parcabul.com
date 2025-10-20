
import { useEffect } from 'react'
import { HashRouter, BrowserRouter, useRoutes, useNavigate } from 'react-router-dom'
import routes from './router/config'

function AppRoutes() {
  return useRoutes(routes);
}

// GH Pages'te hash olmadan gelen kullanıcıyı #/ rotasına yönlendirir
function HashRedirectGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasHash = window.location.hash && window.location.hash.length > 1;
    if (!hasHash) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <AppRoutes />;
}

function App() {
  const isProd = import.meta.env.PROD
  return isProd ? (
    <HashRouter basename="/">
      <HashRedirectGuard />
    </HashRouter>
  ) : (
    <BrowserRouter basename={typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '/'}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
