import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntity, updateEntity, createEntity, reset } from './employe.reducer';

export const EmployeUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const employeEntity = useAppSelector(state => state.employe.entity);
  const loading = useAppSelector(state => state.employe.loading);
  const updating = useAppSelector(state => state.employe.updating);
  const updateSuccess = useAppSelector(state => state.employe.updateSuccess);
  const handleClose = () => {
    props.history.push('/employe');
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
      ...employeEntity,
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
          ...employeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="electroYadaneVfApp.employe.home.createOrEditLabel" data-cy="EmployeCreateUpdateHeading">
            <Translate contentKey="electroYadaneVfApp.employe.home.createOrEditLabel">Create or edit a Employe</Translate>
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
                  id="employe-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('electroYadaneVfApp.employe.poste')}
                id="employe-poste"
                name="poste"
                data-cy="poste"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.employe.salaire')}
                id="employe-salaire"
                name="salaire"
                data-cy="salaire"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.employe.dateEmbauche')}
                id="employe-dateEmbauche"
                name="dateEmbauche"
                data-cy="dateEmbauche"
                type="date"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/employe" replace color="info">
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

export default EmployeUpdate;
