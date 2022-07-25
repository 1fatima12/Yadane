import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Produit from './produit';
import ProduitDetail from './produit-detail';
import ProduitUpdate from './produit-update';
import ProduitDeleteDialog from './produit-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProduitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProduitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProduitDetail} />
      <ErrorBoundaryRoute path={match.url} component={Produit} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProduitDeleteDialog} />
  </>
);

export default Routes;
