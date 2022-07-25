import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaiement } from 'app/shared/model/paiement.model';
import { ModePaiement } from 'app/shared/model/enumerations/mode-paiement.model';
import { getEntity, updateEntity, createEntity, reset } from './paiement.reducer';

export const PaiementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const paiementEntity = useAppSelector(state => state.paiement.entity);
  const loading = useAppSelector(state => state.paiement.loading);
  const updating = useAppSelector(state => state.paiement.updating);
  const updateSuccess = useAppSelector(state => state.paiement.updateSuccess);
  const modePaiementValues = Object.keys(ModePaiement);
  const handleClose = () => {
    props.history.push('/paiement');
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
      ...paiementEntity,
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
          type: 'CHEQUE',
          ...paiementEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="electroYadaneVfApp.paiement.home.createOrEditLabel" data-cy="PaiementCreateUpdateHeading">
            <Translate contentKey="electroYadaneVfApp.paiement.home.createOrEditLabel">Create or edit a Paiement</Translate>
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
                  id="paiement-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('electroYadaneVfApp.paiement.type')}
                id="paiement-type"
                name="type"
                data-cy="type"
                type="select"
              >
                {modePaiementValues.map(modePaiement => (
                  <option value={modePaiement} key={modePaiement}>
                    {translate('electroYadaneVfApp.ModePaiement.' + modePaiement)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('electroYadaneVfApp.paiement.avance')}
                id="paiement-avance"
                name="avance"
                data-cy="avance"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.paiement.etat')}
                id="paiement-etat"
                name="etat"
                data-cy="etat"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/paiement" replace color="info">
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

export default PaiementUpdate;
