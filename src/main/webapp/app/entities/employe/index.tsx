import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Employe from './employe';
import EmployeDetail from './employe-detail';
import EmployeUpdate from './employe-update';
import EmployeDeleteDialog from './employe-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Employe} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeDeleteDialog} />
  </>
);

export default Routes;
