import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPersonne } from 'app/shared/model/personne.model';
import { getEntity, updateEntity, createEntity, reset } from './personne.reducer';

export const PersonneUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const personneEntity = useAppSelector(state => state.personne.entity);
  const loading = useAppSelector(state => state.personne.loading);
  const updating = useAppSelector(state => state.personne.updating);
  const updateSuccess = useAppSelector(state => state.personne.updateSuccess);
  const handleClose = () => {
    props.history.push('/personne');
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
      ...personneEntity,
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
          ...personneEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="electroYadaneVfApp.personne.home.createOrEditLabel" data-cy="PersonneCreateUpdateHeading">
            <Translate contentKey="electroYadaneVfApp.personne.home.createOrEditLabel">Create or edit a Personne</Translate>
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
                  id="personne-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('electroYadaneVfApp.personne.nom')} id="personne-nom" name="nom" data-cy="nom" type="text" />
              <ValidatedField
                label={translate('electroYadaneVfApp.personne.prenom')}
                id="personne-prenom"
                name="prenom"
                data-cy="prenom"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.personne.telephone')}
                id="personne-telephone"
                name="telephone"
                data-cy="telephone"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.personne.email')}
                id="personne-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('electroYadaneVfApp.personne.adresse')}
                id="personne-adresse"
                name="adresse"
                data-cy="adresse"
                type="text"
              />
              <ValidatedField label={translate('electroYadaneVfApp.personne.age')} id="personne-age" name="age" data-cy="age" type="text" />
              <ValidatedBlobField
                label={translate('electroYadaneVfApp.personne.photo')}
                id="personne-photo"
                name="photo"
                data-cy="photo"
                openActionLabel={translate('entity.action.open')}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/personne" replace color="info">
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

export default PersonneUpdate;
