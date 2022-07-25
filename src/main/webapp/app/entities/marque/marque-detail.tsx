import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './marque.reducer';

export const MarqueDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const marqueEntity = useAppSelector(state => state.marque.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="marqueDetailsHeading">
          <Translate contentKey="electroYadaneVfApp.marque.detail.title">Marque</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{marqueEntity.id}</dd>
          <dt>
            <span id="nomMarque">
              <Translate contentKey="electroYadaneVfApp.marque.nomMarque">Nom Marque</Translate>
            </span>
          </dt>
          <dd>{marqueEntity.nomMarque}</dd>
          <dt>
            <span id="logo">
              <Translate contentKey="electroYadaneVfApp.marque.logo">Logo</Translate>
            </span>
          </dt>
          <dd>
            {marqueEntity.logo ? (
              <div>
                {marqueEntity.logoContentType ? (
                  <a onClick={openFile(marqueEntity.logoContentType, marqueEntity.logo)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {marqueEntity.logoContentType}, {byteSize(marqueEntity.logo)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/marque" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/marque/${marqueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MarqueDetail;
