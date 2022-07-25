import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMarque } from 'app/shared/model/marque.model';
import { getEntities } from './marque.reducer';

export const Marque = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const marqueList = useAppSelector(state => state.marque.entities);
  const loading = useAppSelector(state => state.marque.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="marque-heading" data-cy="MarqueHeading">
        <Translate contentKey="electroYadaneVfApp.marque.home.title">Marques</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.marque.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/marque/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.marque.home.createLabel">Create new Marque</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {marqueList && marqueList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.marque.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.marque.nomMarque">Nom Marque</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.marque.logo">Logo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {marqueList.map((marque, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/marque/${marque.id}`} color="link" size="sm">
                      {marque.id}
                    </Button>
                  </td>
                  <td>{marque.nomMarque}</td>
                  <td>
                    {marque.logo ? (
                      <div>
                        {marque.logoContentType ? (
                          <a onClick={openFile(marque.logoContentType, marque.logo)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {marque.logoContentType}, {byteSize(marque.logo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/marque/${marque.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/marque/${marque.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/marque/${marque.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.marque.home.notFound">No Marques found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Marque;
