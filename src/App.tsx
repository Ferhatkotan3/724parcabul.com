
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './router/config'

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter basename="/724parcabul.com">
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
