import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Categorie from './categorie';
import CategorieDetail from './categorie-detail';
import CategorieUpdate from './categorie-update';
import CategorieDeleteDialog from './categorie-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategorieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategorieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CategorieDetail} />
      <ErrorBoundaryRoute path={match.url} component={Categorie} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CategorieDeleteDialog} />
  </>
);

export default Routes;
