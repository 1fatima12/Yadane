import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './location.reducer';

export const LocationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const locationEntity = useAppSelector(state => state.location.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="locationDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.location.detail.title">Location</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{locationEntity.id}</dd>
          <dt>
            <span id="rueAddress">
              <Translate contentKey="electroYadaneVfApp.location.rueAddress">Rue Address</Translate>
            </span>
          </dt>
          <dd>{locationEntity.rueAddress}</dd>
          <dt>
            <span id="codePostal">
              <Translate contentKey="electroYadaneVfApp.location.codePostal">Code Postal</Translate>
            </span>
          </dt>
          <dd>{locationEntity.codePostal}</dd>
          <dt>
            <span id="ville">
              <Translate contentKey="electroYadaneVfApp.location.ville">Ville</Translate>
            </span>
          </dt>
          <dd>{locationEntity.ville}</dd>
          <dt>
            <span id="province">
              <Translate contentKey="electroYadaneVfApp.location.province">Province</Translate>
            </span>
          </dt>
          <dd>{locationEntity.province}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LocationDetail;
