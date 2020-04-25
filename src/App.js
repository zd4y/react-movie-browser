import React from 'react';
// import { MovieBrowser, MovieList, Navbar, MovieDetails } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from './components/ModalSwitch';

function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <main className="main">
    //     <Switch>
    //       <Route exact path="/" component={MovieList} />
    //       <Route path="/search" component={MovieBrowser} />
    //       <Route path="/movie/:id" component={MovieDetails} />
    //       <Redirect exact from="/movie" to="/search" />
    //       <Route>Not found</Route>
    //     </Switch>
    //   </main>
    // </Router>

    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
