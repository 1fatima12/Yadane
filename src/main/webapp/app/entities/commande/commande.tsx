import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICommande } from 'app/shared/model/commande.model';
import { getEntities } from './commande.reducer';

export const Commande = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const commandeList = useAppSelector(state => state.commande.entities);
  const loading = useAppSelector(state => state.commande.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="commande-heading" data-cy="CommandeHeading">
        <Translate contentKey="electroYadaneVfApp.commande.home.title">Commandes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.commande.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/commande/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.commande.home.createLabel">Create new Commande</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {commandeList && commandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.commande.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.commande.dateCom">Date Com</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.commande.designation">Designation</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandeList.map((commande, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/commande/${commande.id}`} color="link" size="sm">
                      {commande.id}
                    </Button>
                  </td>
                  <td>{commande.dateCom ? <TextFormat type="date" value={commande.dateCom} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{commande.designation}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/commande/${commande.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/commande/${commande.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/commande/${commande.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.commande.home.notFound">No Commandes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Commande;
