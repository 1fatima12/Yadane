import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Personne from './personne';
import Employe from './employe';
import Fournisseur from './fournisseur';
import Client from './client';
import Location from './location';
import Commande from './commande';
import CommandeFournisseur from './commande-fournisseur';
import CommandeClient from './commande-client';
import Facture from './facture';
import Paiement from './paiement';
import BonCommande from './bon-commande';
import Produit from './produit';
import Categorie from './categorie';
import Marque from './marque';
import Magazin from './magazin';
import Arrivage from './arrivage';
import Bti from './bti';
import Stock from './stock';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}personne`} component={Personne} />
        <ErrorBoundaryRoute path={`${match.url}employe`} component={Employe} />
        <ErrorBoundaryRoute path={`${match.url}fournisseur`} component={Fournisseur} />
        <ErrorBoundaryRoute path={`${match.url}client`} component={Client} />
        <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
        <ErrorBoundaryRoute path={`${match.url}commande`} component={Commande} />
        <ErrorBoundaryRoute path={`${match.url}commande-fournisseur`} component={CommandeFournisseur} />
        <ErrorBoundaryRoute path={`${match.url}commande-client`} component={CommandeClient} />
        <ErrorBoundaryRoute path={`${match.url}facture`} component={Facture} />
        <ErrorBoundaryRoute path={`${match.url}paiement`} component={Paiement} />
        <ErrorBoundaryRoute path={`${match.url}bon-commande`} component={BonCommande} />
        <ErrorBoundaryRoute path={`${match.url}produit`} component={Produit} />
        <ErrorBoundaryRoute path={`${match.url}categorie`} component={Categorie} />
        <ErrorBoundaryRoute path={`${match.url}marque`} component={Marque} />
        <ErrorBoundaryRoute path={`${match.url}magazin`} component={Magazin} />
        <ErrorBoundaryRoute path={`${match.url}arrivage`} component={Arrivage} />
        <ErrorBoundaryRoute path={`${match.url}bti`} component={Bti} />
        <ErrorBoundaryRoute path={`${match.url}stock`} component={Stock} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
