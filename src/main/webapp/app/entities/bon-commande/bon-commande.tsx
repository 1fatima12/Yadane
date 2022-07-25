import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { getEntities } from './bon-commande.reducer';

export const BonCommande = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const bonCommandeList = useAppSelector(state => state.bonCommande.entities);
  const loading = useAppSelector(state => state.bonCommande.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="bon-commande-heading" data-cy="BonCommandeHeading">
        <Translate contentKey="electroYadaneVfApp.bonCommande.home.title">Bon Commandes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.bonCommande.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/bon-commande/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.bonCommande.home.createLabel">Create new Bon Commande</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bonCommandeList && bonCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.bonCommande.id">ID</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bonCommandeList.map((bonCommande, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/bon-commande/${bonCommande.id}`} color="link" size="sm">
                      {bonCommande.id}
                    </Button>
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/bon-commande/${bonCommande.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bon-commande/${bonCommande.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/bon-commande/${bonCommande.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="electroYadaneVfApp.bonCommande.home.notFound">No Bon Commandes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BonCommande;
