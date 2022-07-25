import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './categorie.reducer';

export const CategorieDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const categorieEntity = useAppSelector(state => state.categorie.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="categorieDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.categorie.detail.title">Categorie</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.id}</dd>
          <dt>
            <span id="nomCategorie">
              <Translate contentKey="electroYadaneVfApp.categorie.nomCategorie">Nom Categorie</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.nomCategorie}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="electroYadaneVfApp.categorie.description">Description</Translate>
            </span>
          </dt>
          <dd>{categorieEntity.description}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="electroYadaneVfApp.categorie.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {categorieEntity.image ? (
              <div>
                {categorieEntity.imageContentType ? (
                  <a onClick={openFile(categorieEntity.imageContentType, categorieEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {categorieEntity.imageContentType}, {byteSize(categorieEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/categorie" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/categorie/${categorieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CategorieDetail;
