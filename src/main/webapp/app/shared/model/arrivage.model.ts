import dayjs from 'dayjs';

export interface IArrivage {
  id?: number;
  dateArrivage?: string | null;
  prixAchat?: number | null;
}

export const defaultValue: Readonly<IArrivage> = {};
