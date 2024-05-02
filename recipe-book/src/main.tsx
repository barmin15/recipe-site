import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={'home page'} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
