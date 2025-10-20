
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import routes from './router/config'

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter basename={typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '/'}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
