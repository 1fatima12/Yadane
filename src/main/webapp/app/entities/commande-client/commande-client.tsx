import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICommandeClient } from 'app/shared/model/commande-client.model';
import { getEntities } from './commande-client.reducer';

export const CommandeClient = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const commandeClientList = useAppSelector(state => state.commandeClient.entities);
  const loading = useAppSelector(state => state.commandeClient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="commande-client-heading" data-cy="CommandeClientHeading">
        <Translate contentKey="electroYadaneVfApp.commandeClient.home.title">Commande Clients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.commandeClient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/commande-client/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.commandeClient.home.createLabel">Create new Commande Client</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {commandeClientList && commandeClientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.commandeClient.id">ID</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandeClientList.map((commandeClient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/commande-client/${commandeClient.id}`} color="link" size="sm">
                      {commandeClient.id}
                    </Button>
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/commande-client/${commandeClient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/commande-client/${commandeClient.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/commande-client/${commandeClient.id}/delete`}
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
              <Translate contentKey="electroYadaneVfApp.commandeClient.home.notFound">No Commande Clients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CommandeClient;
