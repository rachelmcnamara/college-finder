import React from 'react'
import { createRoot } from 'react-dom/client'
import CollegeFinder from './CollegeFinder.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CollegeFinder />
  </React.StrictMode>
)
