import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Marque from './marque';
import MarqueDetail from './marque-detail';
import MarqueUpdate from './marque-update';
import MarqueDeleteDialog from './marque-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MarqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MarqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MarqueDetail} />
      <ErrorBoundaryRoute path={match.url} component={Marque} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MarqueDeleteDialog} />
  </>
);

export default Routes;
