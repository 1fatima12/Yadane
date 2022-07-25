import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/personne">
        <Translate contentKey="global.menu.entities.personne" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/employe">
        <Translate contentKey="global.menu.entities.employe" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/fournisseur">
        <Translate contentKey="global.menu.entities.fournisseur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/client">
        <Translate contentKey="global.menu.entities.client" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/location">
        <Translate contentKey="global.menu.entities.location" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/commande">
        <Translate contentKey="global.menu.entities.commande" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/commande-fournisseur">
        <Translate contentKey="global.menu.entities.commandeFournisseur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/commande-client">
        <Translate contentKey="global.menu.entities.commandeClient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/facture">
        <Translate contentKey="global.menu.entities.facture" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/paiement">
        <Translate contentKey="global.menu.entities.paiement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/bon-commande">
        <Translate contentKey="global.menu.entities.bonCommande" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/produit">
        <Translate contentKey="global.menu.entities.produit" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/categorie">
        <Translate contentKey="global.menu.entities.categorie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/marque">
        <Translate contentKey="global.menu.entities.marque" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/magazin">
        <Translate contentKey="global.menu.entities.magazin" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/arrivage">
        <Translate contentKey="global.menu.entities.arrivage" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/bti">
        <Translate contentKey="global.menu.entities.bti" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/stock">
        <Translate contentKey="global.menu.entities.stock" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
