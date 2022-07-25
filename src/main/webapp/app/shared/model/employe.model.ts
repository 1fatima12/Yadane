import dayjs from 'dayjs';

export interface IEmploye {
  id?: number;
  poste?: string | null;
  salaire?: number | null;
  dateEmbauche?: string | null;
}

export const defaultValue: Readonly<IEmploye> = {};
