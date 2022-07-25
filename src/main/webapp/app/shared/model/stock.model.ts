export interface IStock {
  id?: number;
  qte?: number | null;
}

export const defaultValue: Readonly<IStock> = {};
