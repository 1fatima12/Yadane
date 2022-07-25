import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IArrivage } from 'app/shared/model/arrivage.model';
import { getEntities } from './arrivage.reducer';

export const Arrivage = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const arrivageList = useAppSelector(state => state.arrivage.entities);
  const loading = useAppSelector(state => state.arrivage.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="arrivage-heading" data-cy="ArrivageHeading">
        <Translate contentKey="electroYadaneVfApp.arrivage.home.title">Arrivages</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.arrivage.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/arrivage/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.arrivage.home.createLabel">Create new Arrivage</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {arrivageList && arrivageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.arrivage.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.arrivage.dateArrivage">Date Arrivage</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.arrivage.prixAchat">Prix Achat</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {arrivageList.map((arrivage, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/arrivage/${arrivage.id}`} color="link" size="sm">
                      {arrivage.id}
                    </Button>
                  </td>
                  <td>
                    {arrivage.dateArrivage ? <TextFormat type="date" value={arrivage.dateArrivage} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{arrivage.prixAchat}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/arrivage/${arrivage.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/arrivage/${arrivage.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/arrivage/${arrivage.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.arrivage.home.notFound">No Arrivages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Arrivage;
