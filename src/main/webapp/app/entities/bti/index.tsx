import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bti from './bti';
import BtiDetail from './bti-detail';
import BtiUpdate from './bti-update';
import BtiDeleteDialog from './bti-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BtiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BtiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BtiDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bti} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BtiDeleteDialog} />
  </>
);

export default Routes;
