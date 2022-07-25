import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fournisseur.reducer';

export const FournisseurDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const fournisseurEntity = useAppSelector(state => state.fournisseur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fournisseurDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.fournisseur.detail.title">Fournisseur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.id}</dd>
          <dt>
            <span id="entreprise">
              <Translate contentKey="electroYadaneVfApp.fournisseur.entreprise">Entreprise</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.entreprise}</dd>
          <dt>
            <span id="fax">
              <Translate contentKey="electroYadaneVfApp.fournisseur.fax">Fax</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.fax}</dd>
          <dt>
            <span id="ice">
              <Translate contentKey="electroYadaneVfApp.fournisseur.ice">Ice</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.ice}</dd>
        </dl>
        <Button tag={Link} to="/fournisseur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fournisseur/${fournisseurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FournisseurDetail;
