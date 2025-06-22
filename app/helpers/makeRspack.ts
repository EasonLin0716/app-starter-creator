import { MainLibraryEnum } from '../enums/DepEnums';
import { File } from '../interfaces/File';
import { MakeHTML } from '../interfaces/Make';
import { Tool } from '../interfaces/Tool';
import { generateExportStatements, generateImportStatements } from '../utils/generateCodes';
import { makeHTML, makeNoLibraryJS, makeNoLibraryUtil } from './mainLibrary/makeNoLibrary';
import { getBaseCSS, makeGitIgnore, makeREADME } from './makeStarterFile';

export const makeRspack = (): {
  json: ({ projectName }: { projectName: string }) => File;
  css: ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }) => File[];
  entry: ({ mainLibrary, entryID, tool }: { mainLibrary: MainLibraryEnum; entryID: string; tool: Tool }) => File[];
  util: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
  config: () => File;
  default: ({ projectName }: { projectName: string }) => File[];
  html: ({ entryID, mainLibrary, tool }: MakeHTML) => File;
} => ({
  json: makeJSON,
  css: makeMainCSS,
  entry: makeMainJS,
  config: makeConfig,
  util: utilFuncJS,
  default: makeDefault,
  html: makeHTML
});

const utilFuncJS = ({ mainLibrary }: { mainLibrary: MainLibraryEnum }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) return [makeNoLibraryUtil()];
  return [];
};

const makeMainJS = ({ mainLibrary, entryID = 'app', tool }: { mainLibrary: MainLibraryEnum; entryID: string; tool: Tool }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) return [makeNoLibraryJS({ entryID, tool })];
  return [];
};

const makeMainCSS = ({ mainLibrary }: { mainLibrary: MainLibraryEnum }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) {
    return [getBaseCSS()];
  }
  return [];
};

const makeConfig = (): File => ({
  name: 'rsbuild.config.mjs',
  code: `${generateImportStatements([{ name: 'defineConfig', library: '@rsbuild/core' }])}

${generateExportStatements([{ name: 'defineConfig({})' }])}
`,
  type: 'js'
});

const makeJSON = ({ projectName }: { projectName: string }): File => ({
  name: 'package.json',
  code: `{
  "name": "${projectName}",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "rsbuild build",
    "dev": "rsbuild dev --open",
    "preview": "rsbuild preview"
  },
  "devDependencies": {
    "@rsbuild/core": "^1"
  }
}
`,
  type: 'json'
});

const makeDefault = ({ projectName }: { projectName: string }): File[] => [makeGitIgnore(), makeREADME({ projectName })];
