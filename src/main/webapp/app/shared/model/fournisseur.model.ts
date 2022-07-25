export interface IFournisseur {
  id?: number;
  entreprise?: string | null;
  fax?: string | null;
  ice?: string | null;
}

export const defaultValue: Readonly<IFournisseur> = {};
