import { DepTitleEnum } from '../enums/DepEnums';

export interface Dep {
  name: string;
  version: string;
  isDevDep?: boolean;
}

export interface Dep {
  name: string;
  version: string;
  isDevDep?: boolean;
}

export type Library = {
  name: string;
  dependencies?: Dep[];
};

export interface DepSelect {
  title: DepTitleEnum;
  deps: Library[];
}

export type DepSelectMapType = Record<DepTitleEnum, number>;
