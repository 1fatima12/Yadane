import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Facture from './facture';
import FactureDetail from './facture-detail';
import FactureUpdate from './facture-update';
import FactureDeleteDialog from './facture-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FactureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FactureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FactureDetail} />
      <ErrorBoundaryRoute path={match.url} component={Facture} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FactureDeleteDialog} />
  </>
);

export default Routes;
