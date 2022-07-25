import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CommandeClient from './commande-client';
import CommandeClientDetail from './commande-client-detail';
import CommandeClientUpdate from './commande-client-update';
import CommandeClientDeleteDialog from './commande-client-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommandeClientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommandeClientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommandeClientDetail} />
      <ErrorBoundaryRoute path={match.url} component={CommandeClient} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommandeClientDeleteDialog} />
  </>
);

export default Routes;
