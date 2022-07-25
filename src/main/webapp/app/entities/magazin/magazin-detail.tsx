import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './magazin.reducer';

export const MagazinDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const magazinEntity = useAppSelector(state => state.magazin.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="magazinDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.magazin.detail.title">Magazin</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{magazinEntity.id}</dd>
          <dt>
            <span id="nomMagazin">
              <Translate contentKey="electroYadaneVfApp.magazin.nomMagazin">Nom Magazin</Translate>
            </span>
          </dt>
          <dd>{magazinEntity.nomMagazin}</dd>
          <dt>
            <span id="adresseMagazin">
              <Translate contentKey="electroYadaneVfApp.magazin.adresseMagazin">Adresse Magazin</Translate>
            </span>
          </dt>
          <dd>{magazinEntity.adresseMagazin}</dd>
        </dl>
        <Button tag={Link} to="/magazin" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/magazin/${magazinEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MagazinDetail;
