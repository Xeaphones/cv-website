import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
const App = lazy(() => import('./routes/init'));
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router >
        <App />
    </Router>
  </StrictMode>
)
