import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Commande from './commande';
import CommandeDetail from './commande-detail';
import CommandeUpdate from './commande-update';
import CommandeDeleteDialog from './commande-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommandeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Commande} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommandeDeleteDialog} />
  </>
);

export default Routes;
