import dayjs from 'dayjs';

export interface ICommande {
  id?: number;
  dateCom?: string | null;
  designation?: string | null;
}

export const defaultValue: Readonly<ICommande> = {};
