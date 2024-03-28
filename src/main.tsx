import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@/components/themeProvider"
import { router } from './router'
import './index.css'
import './App.css'

import "./i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <RouterProvider router={router}/>
      </ThemeProvider>
  </React.StrictMode>,
)
