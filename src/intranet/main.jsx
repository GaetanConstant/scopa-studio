import React from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './intranet.css'
import Intranet from './Intranet'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Intranet />
  </React.StrictMode>
)
