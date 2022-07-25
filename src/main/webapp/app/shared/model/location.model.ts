export interface ILocation {
  id?: number;
  rueAddress?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  province?: string | null;
}

export const defaultValue: Readonly<ILocation> = {};
