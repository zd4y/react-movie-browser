import React from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieBrowser from './components/MovieBrowser';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="main">
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route path="/search" component={MovieBrowser} />
            {/* <Route path="/movie/:movieId" component={MovieDetails} /> */}
            <Redirect exact from="/" to="/search" />
            <Redirect exact from="/movie" to="/search" />
            <Route>Not found</Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
