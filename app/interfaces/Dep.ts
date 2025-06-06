export interface Dep {
  name: string;
  version: string;
  isDevDep?: boolean;
}

export enum DepTitleEnum {
  mainLibrary = 'Main library'
}

export interface DepInfo {
  title: DepTitleEnum;
  deps: Dep[];
}

export type DepSelectMapType = Record<DepTitleEnum, number>;
