import personne from 'app/entities/personne/personne.reducer';
import employe from 'app/entities/employe/employe.reducer';
import fournisseur from 'app/entities/fournisseur/fournisseur.reducer';
import client from 'app/entities/client/client.reducer';
import location from 'app/entities/location/location.reducer';
import commande from 'app/entities/commande/commande.reducer';
import commandeFournisseur from 'app/entities/commande-fournisseur/commande-fournisseur.reducer';
import commandeClient from 'app/entities/commande-client/commande-client.reducer';
import facture from 'app/entities/facture/facture.reducer';
import paiement from 'app/entities/paiement/paiement.reducer';
import bonCommande from 'app/entities/bon-commande/bon-commande.reducer';
import produit from 'app/entities/produit/produit.reducer';
import categorie from 'app/entities/categorie/categorie.reducer';
import marque from 'app/entities/marque/marque.reducer';
import magazin from 'app/entities/magazin/magazin.reducer';
import arrivage from 'app/entities/arrivage/arrivage.reducer';
import bti from 'app/entities/bti/bti.reducer';
import stock from 'app/entities/stock/stock.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  personne,
  employe,
  fournisseur,
  client,
  location,
  commande,
  commandeFournisseur,
  commandeClient,
  facture,
  paiement,
  bonCommande,
  produit,
  categorie,
  marque,
  magazin,
  arrivage,
  bti,
  stock,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
