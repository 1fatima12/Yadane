import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bti.reducer';

export const BtiDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const btiEntity = useAppSelector(state => state.bti.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="btiDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.bti.detail.title">Bti</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{btiEntity.id}</dd>
          <dt>
            <span id="numOrdre">
              <Translate contentKey="electroYadaneVfApp.bti.numOrdre">Num Ordre</Translate>
            </span>
          </dt>
          <dd>{btiEntity.numOrdre}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="electroYadaneVfApp.bti.date">Date</Translate>
            </span>
          </dt>
          <dd>{btiEntity.date ? <TextFormat value={btiEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="qte">
              <Translate contentKey="electroYadaneVfApp.bti.qte">Qte</Translate>
            </span>
          </dt>
          <dd>{btiEntity.qte}</dd>
        </dl>
        <Button tag={Link} to="/bti" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bti/${btiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BtiDetail;
