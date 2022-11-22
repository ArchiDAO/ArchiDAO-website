
import React from 'react';
import './styles.css';
// import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/Navbar';
import People from './components/pages/People';
import ReadRemoteFile from './components/ParseRemote';
import Locations from './components/pages/Locations';
// import Dashboard from './components/pages/Dashboard';



function App() {

  
  return (

      <>
        <Router>
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/home" element={<Home/>}/>
                  <Route exact path="/about" element={<About/>}/>
                  <Route exact path="/people" element={<People/>}/>
                  <Route exact path="/read" element={<ReadRemoteFile/>}/>
                  <Route exact path="/locations" element={<Locations/>}/>
                </Routes>          
            </Router>
            
      </>

  );
}

export default App;