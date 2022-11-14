
import React from 'react';
import './styles.css';
// import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/Navbar';
// import Dashboard from './components/pages/Dashboard';



function App() {

  
  return (

      <>
      <Navbar />
           
      <About />
       {/* <Home /> */}
      </>

  );
}

export default App;