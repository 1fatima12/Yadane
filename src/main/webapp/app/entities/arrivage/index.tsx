import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Arrivage from './arrivage';
import ArrivageDetail from './arrivage-detail';
import ArrivageUpdate from './arrivage-update';
import ArrivageDeleteDialog from './arrivage-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArrivageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArrivageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArrivageDetail} />
      <ErrorBoundaryRoute path={match.url} component={Arrivage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ArrivageDeleteDialog} />
  </>
);

export default Routes;
