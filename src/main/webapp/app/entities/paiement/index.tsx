import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paiement from './paiement';
import PaiementDetail from './paiement-detail';
import PaiementUpdate from './paiement-update';
import PaiementDeleteDialog from './paiement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaiementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaiementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaiementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Paiement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaiementDeleteDialog} />
  </>
);

export default Routes;
