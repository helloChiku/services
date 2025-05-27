import 'react-phone-input-2/lib/style.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AppointmentProvider} from './context/AppointmentContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppointmentProvider><App/></AppointmentProvider>
   
  // </StrictMode>,
)
