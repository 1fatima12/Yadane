import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Personne from './personne';
import PersonneDetail from './personne-detail';
import PersonneUpdate from './personne-update';
import PersonneDeleteDialog from './personne-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PersonneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PersonneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PersonneDetail} />
      <ErrorBoundaryRoute path={match.url} component={Personne} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PersonneDeleteDialog} />
  </>
);

export default Routes;
