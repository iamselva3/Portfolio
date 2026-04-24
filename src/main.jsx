import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { PreferenceProvider } from './context/PreferenceContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PreferenceProvider>
        <App />
      </PreferenceProvider>
    </ThemeProvider>
  </StrictMode>,
)
