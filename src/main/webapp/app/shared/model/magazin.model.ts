export interface IMagazin {
  id?: number;
  nomMagazin?: string | null;
  adresseMagazin?: string | null;
}

export const defaultValue: Readonly<IMagazin> = {};
