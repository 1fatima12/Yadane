export interface IClient {
  id?: number;
  ice?: string | null;
}

export const defaultValue: Readonly<IClient> = {};
