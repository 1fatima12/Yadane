import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './arrivage.reducer';

export const ArrivageDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const arrivageEntity = useAppSelector(state => state.arrivage.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="arrivageDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.arrivage.detail.title">Arrivage</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{arrivageEntity.id}</dd>
          <dt>
            <span id="dateArrivage">
              <Translate contentKey="electroYadaneVfApp.arrivage.dateArrivage">Date Arrivage</Translate>
            </span>
          </dt>
          <dd>
            {arrivageEntity.dateArrivage ? (
              <TextFormat value={arrivageEntity.dateArrivage} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="prixAchat">
              <Translate contentKey="electroYadaneVfApp.arrivage.prixAchat">Prix Achat</Translate>
            </span>
          </dt>
          <dd>{arrivageEntity.prixAchat}</dd>
        </dl>
        <Button tag={Link} to="/arrivage" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/arrivage/${arrivageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ArrivageDetail;
