
import React, { useState, useEffect } from 'react';
import './styles.css';
// import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/Navbar';
// import People from './components/pages/People';
import ReadRemoteFile from './components/ParseRemote';
import Locations from './components/pages/Locations';
import Dashboard from './components/pages/Dashboard';
import Contact from './components/pages/Contact';
import Learn from './components/pages/Learn';






function App() {
 

  return (

      <>
        <Router>
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/home" element={<Home/>}/>
                  <Route exact path="/about" element={<About/>}/>
                  <Route exact path="/people" element={<Locations/>}/>
                  <Route exact path="/contact" element={<Contact/>}/>
                  <Route exact path="/read" element={<ReadRemoteFile/>}/>
                  <Route exact path="/locations" element={<Locations/>}/>
                  <Route exact path="/dashboard" element={<Dashboard/>}/>
                  <Route exact path="/Learn" element={<Learn/>}/>

                </Routes>          
            </Router>
            
      </>

  );
}

export default App;