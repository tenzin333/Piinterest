import React, { useState, useEffect } from 'react';
import Router from "./Components/Router/Router";
import { AuthProvider } from './Context/AuthContext';
import SearchProvider from './Context/SearchContext';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './Context/ThemeContext';
const App = () => {


  return (
    <>
      <BrowserRouter>
        <AuthProvider >
          <SearchProvider>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App;