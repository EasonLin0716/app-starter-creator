import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';

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

type LibraryName = MainLibraryEnum;

export type LibraryType = {
  name: LibraryName;
  dependencies?: Dep[];
};

export interface DepSelect {
  title: DepTitleEnum;
  deps: LibraryType[];
}

export type DepSelectMapType = Record<DepTitleEnum, number>;
