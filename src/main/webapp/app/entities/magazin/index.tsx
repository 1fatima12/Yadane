import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Magazin from './magazin';
import MagazinDetail from './magazin-detail';
import MagazinUpdate from './magazin-update';
import MagazinDeleteDialog from './magazin-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MagazinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MagazinUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MagazinDetail} />
      <ErrorBoundaryRoute path={match.url} component={Magazin} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MagazinDeleteDialog} />
  </>
);

export default Routes;
