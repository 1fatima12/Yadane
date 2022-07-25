export interface IFacture {
  id?: number;
  idFacture?: number | null;
  montant?: number | null;
}

export const defaultValue: Readonly<IFacture> = {};
