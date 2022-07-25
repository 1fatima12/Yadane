import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities } from './categorie.reducer';

export const Categorie = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const categorieList = useAppSelector(state => state.categorie.entities);
  const loading = useAppSelector(state => state.categorie.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="categorie-heading" data-cy="CategorieHeading">
        <Translate contentKey="electroYadaneVfApp.categorie.home.title">Categories</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="electroYadaneVfApp.categorie.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/categorie/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="electroYadaneVfApp.categorie.home.createLabel">Create new Categorie</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {categorieList && categorieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="electroYadaneVfApp.categorie.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.categorie.nomCategorie">Nom Categorie</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.categorie.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="electroYadaneVfApp.categorie.image">Image</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {categorieList.map((categorie, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/categorie/${categorie.id}`} color="link" size="sm">
                      {categorie.id}
                    </Button>
                  </td>
                  <td>{categorie.nomCategorie}</td>
                  <td>{categorie.description}</td>
                  <td>
                    {categorie.image ? (
                      <div>
                        {categorie.imageContentType ? (
                          <a onClick={openFile(categorie.imageContentType, categorie.image)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {categorie.imageContentType}, {byteSize(categorie.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/categorie/${categorie.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/categorie/${categorie.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/categorie/${categorie.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="electroYadaneVfApp.categorie.home.notFound">No Categories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Categorie;
