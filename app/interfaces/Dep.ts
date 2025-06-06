export interface Dep {
  name: string;
  version: string;
  isDevDep?: boolean;
}

export enum DepTitleEnum {
  mainLibrary = 'Main library'
}

export interface Dep {
  name: string;
  version: string;
}

export type Library = {
  name: string;
  dependencies?: Dep[];
  devDependencies?: Dep[];
};

export interface DepSelect {
  title: DepTitleEnum;
  deps: Library[];
}

export type DepSelectMapType = Record<DepTitleEnum, number>;
