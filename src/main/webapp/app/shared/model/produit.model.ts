export interface IProduit {
  id?: number;
  numProd?: number | null;
  nomProd?: string | null;
  status?: boolean | null;
  prixVente?: number | null;
  imageContentType?: string | null;
  image?: string | null;
}

export const defaultValue: Readonly<IProduit> = {
  status: false,
};
