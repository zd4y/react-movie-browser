import React from 'react';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';
import { MovieBrowser, MovieList, Navbar, MovieDetails } from './';

export default function ModalSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;

  background
    ? document.body.classList.add('modal-open')
    : document.body.classList.remove('modal-open');

  return (
    <>
      <Navbar />
      <main className="main">
        <Switch location={background || location}>
          <Route exact path="/" component={MovieList} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/search" component={MovieBrowser} />
          <Redirect exact from="/movie" to="/search" />
          <Route>Not found</Route>
        </Switch>
      </main>
      {background && <Route path="/movie/:id" component={MovieDetails} />}
    </>
  );
}
