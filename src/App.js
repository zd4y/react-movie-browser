import React from 'react';
// import { MovieBrowser, MovieList, Navbar, MovieDetails } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from './components/ModalSwitch';

function App() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
