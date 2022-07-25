export interface IMarque {
  id?: number;
  nomMarque?: string | null;
  logoContentType?: string | null;
  logo?: string | null;
}

export const defaultValue: Readonly<IMarque> = {};
