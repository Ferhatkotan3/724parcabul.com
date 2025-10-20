
import { HashRouter, BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './router/config'

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  const isProd = import.meta.env.PROD
  return isProd ? (
    <HashRouter basename="/">
      <AppRoutes />
    </HashRouter>
  ) : (
    <BrowserRouter basename={typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '/'}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
