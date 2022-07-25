export interface ICategorie {
  id?: number;
  nomCategorie?: string | null;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
}

export const defaultValue: Readonly<ICategorie> = {};
