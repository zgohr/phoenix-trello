import { IndexRoute, Route } from 'react-router';
import React from 'react';
import MainLayout from '../layouts/main';
import AuthenticatedContainer from '../containers/authenticated';
import HomeIndexView from '../views/home';
import RegistrationsNew from '../views/registrations/new';
import SessionsNew from '../views/sessions/new';
// import BoardsShowView from '../views/boards/show';
// import CardsShowView from '../views/cards/show';

export default function configRoutes(store) {

  return (
    <Route component={MainLayout}>
      <route path="/sign_up" component={RegistrationsNew} />
      <route path="/sign_in" component={SessionsNew} />

      <Route path="/" component={AuthenticatedContainer} >
        <IndexRoute component={HomeIndexView} />

        {/*<Route path="/boards/:id" component={BoardsShowView}>*/}
          {/*<Route path="cards/:id" component={CardsShowView} />*/}
        {/*</Route>*/}
      </Route>
    </Route>
  );
}