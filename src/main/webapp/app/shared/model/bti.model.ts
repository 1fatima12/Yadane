import dayjs from 'dayjs';

export interface IBti {
  id?: number;
  numOrdre?: number | null;
  date?: string | null;
  qte?: number | null;
}

export const defaultValue: Readonly<IBti> = {};
