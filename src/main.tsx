import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from "@/components/themeProvider"
import { router } from './router'
import './index.css'
import './App.css'
import './styles/blog-markdown.css'

import "./i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <RouterProvider router={router}/>
        </ThemeProvider>
      </HelmetProvider>
  </React.StrictMode>,
)
