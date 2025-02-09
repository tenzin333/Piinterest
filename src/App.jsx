import React, { useState, useEffect } from 'react';
import Router from "./Components/Router/Router";
import { AuthProvider } from './Context/AuthContext';
import SearchProvider from './Context/SearchContext';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import ThemeProvider from './Context/ThemeContext';
const App = () => {


  return (
    <>
      <HashRouter>            {/* repalced browserrouter*/}
        <AuthProvider >
          <SearchProvider>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
      </HashRouter>

    </>
  )
}

export default App;