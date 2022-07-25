import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './produit.reducer';

export const ProduitDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const produitEntity = useAppSelector(state => state.produit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="produitDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.produit.detail.title">Produit</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{produitEntity.id}</dd>
          <dt>
            <span id="numProd">
              <Translate contentKey="electroYadaneVfApp.produit.numProd">Num Prod</Translate>
            </span>
          </dt>
          <dd>{produitEntity.numProd}</dd>
          <dt>
            <span id="nomProd">
              <Translate contentKey="electroYadaneVfApp.produit.nomProd">Nom Prod</Translate>
            </span>
          </dt>
          <dd>{produitEntity.nomProd}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="electroYadaneVfApp.produit.status">Status</Translate>
            </span>
          </dt>
          <dd>{produitEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <span id="prixVente">
              <Translate contentKey="electroYadaneVfApp.produit.prixVente">Prix Vente</Translate>
            </span>
          </dt>
          <dd>{produitEntity.prixVente}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="electroYadaneVfApp.produit.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {produitEntity.image ? (
              <div>
                {produitEntity.imageContentType ? (
                  <a onClick={openFile(produitEntity.imageContentType, produitEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {produitEntity.imageContentType}, {byteSize(produitEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/produit" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit/${produitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProduitDetail;
