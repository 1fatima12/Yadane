import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntity, updateEntity, createEntity, reset } from './fournisseur.reducer';

export const FournisseurUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const fournisseurEntity = useAppSelector(state => state.fournisseur.entity);
  const loading = useAppSelector(state => state.fournisseur.loading);
  const updating = useAppSelector(state => state.fournisseur.updating);
  const updateSuccess = useAppSelector(state => state.fournisseur.updateSuccess);
  const handleClose = () => {
    props.history.push('/fournisseur');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fournisseurEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...fournisseurEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="electroYadaneVfApp.fournisseur.home.createOrEditLabel" data-cy="FournisseurCreateUpdateHeading">
            <Translate contentKey="electroYadaneVfApp.fournisseur.home.createOrEditLabel">Create or edit a Fournisseur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="fournisseur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('electroYadaneVfApp.fournisseur.entreprise')}
                id="fournisseur-entreprise"
                name="entreprise"
                data-cy="entreprise"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.fournisseur.fax')}
                id="fournisseur-fax"
                name="fax"
                data-cy="fax"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.fournisseur.ice')}
                id="fournisseur-ice"
                name="ice"
                data-cy="ice"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fournisseur" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FournisseurUpdate;
