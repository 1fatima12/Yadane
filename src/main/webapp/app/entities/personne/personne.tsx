import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPersonne } from 'app/shared/model/personne.model';
import { getEntities } from './personne.reducer';

export const Personne = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const personneList = useAppSelector(state => state.personne.entities);
  const loading = useAppSelector(state => state.personne.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="personne-heading" data-cy="PersonneHeading">
        <Translate contentKey="electroYadaneVfApp.personne.home.title">Personnes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.personne.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/personne/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.personne.home.createLabel">Create new Personne</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {personneList && personneList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.prenom">Prenom</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.telephone">Telephone</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.adresse">Adresse</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.age">Age</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.personne.photo">Photo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personneList.map((personne, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/personne/${personne.id}`} color="link" size="sm">
                      {personne.id}
                    </Button>
                  </td>
                  <td>{personne.nom}</td>
                  <td>{personne.prenom}</td>
                  <td>{personne.telephone}</td>
                  <td>{personne.email}</td>
                  <td>{personne.adresse}</td>
                  <td>{personne.age}</td>
                  <td>
                    {personne.photo ? (
                      <div>
                        {personne.photoContentType ? (
                          <a onClick={openFile(personne.photoContentType, personne.photo)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {personne.photoContentType}, {byteSize(personne.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/personne/${personne.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/personne/${personne.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/personne/${personne.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.personne.home.notFound">No Personnes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Personne;
