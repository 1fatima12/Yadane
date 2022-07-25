export interface IPersonne {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  telephone?: string | null;
  email?: string | null;
  adresse?: string | null;
  age?: number | null;
  photoContentType?: string | null;
  photo?: string | null;
}

export const defaultValue: Readonly<IPersonne> = {};
