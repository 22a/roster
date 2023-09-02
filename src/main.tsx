import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Helmet } from "react-helmet"
import nightwind from "nightwind/helper"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Helmet>
      <script>{nightwind.init()}</script>
    </Helmet>
    <App />
  </>,
)
