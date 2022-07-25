import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBti } from 'app/shared/model/bti.model';
import { getEntities } from './bti.reducer';

export const Bti = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const btiList = useAppSelector(state => state.bti.entities);
  const loading = useAppSelector(state => state.bti.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="bti-heading" data-cy="BtiHeading">
        <Translate contentKey="electroYadaneVfApp.bti.home.title">Btis</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.bti.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/bti/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.bti.home.createLabel">Create new Bti</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {btiList && btiList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.bti.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.bti.numOrdre">Num Ordre</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.bti.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.bti.qte">Qte</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {btiList.map((bti, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/bti/${bti.id}`} color="link" size="sm">
                      {bti.id}
                    </Button>
                  </td>
                  <td>{bti.numOrdre}</td>
                  <td>{bti.date ? <TextFormat type="date" value={bti.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{bti.qte}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/bti/${bti.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bti/${bti.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bti/${bti.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.bti.home.notFound">No Btis found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Bti;
