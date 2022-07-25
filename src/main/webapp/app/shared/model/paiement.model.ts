import { ModePaiement } from 'app/shared/model/enumerations/mode-paiement.model';

export interface IPaiement {
  id?: number;
  type?: ModePaiement | null;
  avance?: number | null;
  etat?: boolean | null;
}

export const defaultValue: Readonly<IPaiement> = {
  etat: false,
};
