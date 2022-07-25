import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CommandeFournisseur from './commande-fournisseur';
import CommandeFournisseurDetail from './commande-fournisseur-detail';
import CommandeFournisseurUpdate from './commande-fournisseur-update';
import CommandeFournisseurDeleteDialog from './commande-fournisseur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommandeFournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommandeFournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommandeFournisseurDetail} />
      <ErrorBoundaryRoute path={match.url} component={CommandeFournisseur} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommandeFournisseurDeleteDialog} />
  </>
);

export default Routes;
