import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import App1 from './components/App/App1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App1 />
  </StrictMode>,
)
