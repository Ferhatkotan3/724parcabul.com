
import { HashRouter, useRoutes } from 'react-router-dom'
import routes from './router/config'

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <HashRouter basename="/">
      <AppRoutes />
    </HashRouter>
  )
}

export default App
