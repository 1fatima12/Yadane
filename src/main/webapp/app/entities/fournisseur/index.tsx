import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fournisseur from './fournisseur';
import FournisseurDetail from './fournisseur-detail';
import FournisseurUpdate from './fournisseur-update';
import FournisseurDeleteDialog from './fournisseur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FournisseurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fournisseur} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FournisseurDeleteDialog} />
  </>
);

export default Routes;
