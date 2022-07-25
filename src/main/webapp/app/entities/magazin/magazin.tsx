import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMagazin } from 'app/shared/model/magazin.model';
import { getEntities } from './magazin.reducer';

export const Magazin = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const magazinList = useAppSelector(state => state.magazin.entities);
  const loading = useAppSelector(state => state.magazin.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="magazin-heading" data-cy="MagazinHeading">
        <Translate contentKey="electroYadaneVfApp.magazin.home.title">Magazins</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.magazin.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/magazin/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.magazin.home.createLabel">Create new Magazin</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {magazinList && magazinList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.magazin.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.magazin.nomMagazin">Nom Magazin</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.magazin.adresseMagazin">Adresse Magazin</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {magazinList.map((magazin, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/magazin/${magazin.id}`} color="link" size="sm">
                      {magazin.id}
                    </Button>
                  </td>
                  <td>{magazin.nomMagazin}</td>
                  <td>{magazin.adresseMagazin}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/magazin/${magazin.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/magazin/${magazin.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/magazin/${magazin.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.magazin.home.notFound">No Magazins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Magazin;
