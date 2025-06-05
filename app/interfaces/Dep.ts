export enum DepTitleEnum {
  mainLibrary = 'Main library'
}

export interface Dep {
  title: DepTitleEnum;
  deps: string[];
}

export type DepSelectMapType = Record<DepTitleEnum, number>;
