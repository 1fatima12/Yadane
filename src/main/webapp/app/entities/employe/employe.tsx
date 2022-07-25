import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities } from './employe.reducer';

export const Employe = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const employeList = useAppSelector(state => state.employe.entities);
  const loading = useAppSelector(state => state.employe.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="employe-heading" data-cy="EmployeHeading">
        <Translate contentKey="electroYadaneVfApp.employe.home.title">Employes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.employe.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/employe/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.employe.home.createLabel">Create new Employe</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {employeList && employeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.employe.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.employe.poste">Poste</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.employe.salaire">Salaire</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.employe.dateEmbauche">Date Embauche</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeList.map((employe, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/employe/${employe.id}`} color="link" size="sm">
                      {employe.id}
                    </Button>
                  </td>
                  <td>{employe.poste}</td>
                  <td>{employe.salaire}</td>
                  <td>
                    {employe.dateEmbauche ? <TextFormat type="date" value={employe.dateEmbauche} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/employe/${employe.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/employe/${employe.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/employe/${employe.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.employe.home.notFound">No Employes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Employe;
