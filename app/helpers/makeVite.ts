import { depList } from '../constants/constants';
import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';
import { Dep } from '../interfaces/Dep';
import { File } from '../interfaces/File';
import { MakeHTML } from '../interfaces/Make';
import { Tool } from '../interfaces/Tool';
import { makeJSONDepAndDevDeps } from '../utils/utils';
import { makeHTML, makeNoLibraryJS, makeNoLibraryUtil } from './mainLibrary/makeNoLibrary';
import {
  getBaseCSS,
  makeGitIgnore,
  makeREADME,
  makeReactAppCSS,
  makeReactAppJsx,
  makeReactMainJsx,
  makeSvelteAppCSS,
  makeSvelteConfigJSON,
  makeSvelteCounterComponent,
  makeSvelteMainComponent,
  makeSvelteMainJs,
  makeVueAppComponent,
  makeVueHelloWorldComponent,
  makeVueMainJs
} from './makeStarterFile';

export const makeVite = (): {
  html: ({ entryID, mainLibrary, tool }: MakeHTML) => File;
  json: ({ projectName, depList, mainLibrary }: { projectName: string; depList: Dep[]; mainLibrary: MainLibraryEnum }) => File[];
  css: ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }) => File[];
  entry: ({ mainLibrary, entryID, tool }: { mainLibrary: MainLibraryEnum; entryID: string; tool: Tool }) => File[];
  util: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
  config: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
  default: ({ projectName }: { projectName: string }) => File[];
} => ({
  html: makeHTML,
  json: makeJSON,
  css: makeMainCSS,
  entry: makeMainJS,
  util: utilFuncJS,
  config: makeConfig,
  default: makeDefault
});

export const VITE_DEP: Dep = {
  name: 'vite',
  version: '^6',
  isDevDep: true
};

const makeDefault = ({ projectName }: { projectName: string }): File[] => [makeGitIgnore(), makeREADME({ projectName })];

export const makeConfig = ({ mainLibrary }: { mainLibrary: MainLibraryEnum }): File[] => {
  const name = 'vite.config.js';
  const type = 'js';
  const libInLowerCase = mainLibrary.toLowerCase();
  if (mainLibrary === MainLibraryEnum.svelte) {
    return [
      {
        name: 'svelte.config.js',
        code: `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
`,
        type
      },
      {
        name: 'src/vite-env.d.ts',
        code: `/// <reference types="svelte" />
/// <reference types="vite/client" />
`,
        type: 'ts'
      },
      {
        name,
        code: `import { defineConfig } from 'vite'
import { ${libInLowerCase} } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [${libInLowerCase}()],
})`,
        type
      }
    ];
  }
  if (mainLibrary !== MainLibraryEnum.noLibrary) {
    return [
      {
        name,
        code: `import { defineConfig } from 'vite'
import ${libInLowerCase} from '@vitejs/plugin-${libInLowerCase}'

// https://vite.dev/config/
export default defineConfig({
  plugins: [${libInLowerCase}()],
})`,
        type
      }
    ];
  }
  return [];
};

export const makeMainLibraryDependencies = (mainLibrary: MainLibraryEnum) => {
  const mainLibraries = depList.find((d) => d.title === DepTitleEnum.mainLibrary);
  if (!mainLibraries) throw new Error('mainLibraries not found.');
  return mainLibraries.deps.find((m) => m.name === mainLibrary)?.dependencies ?? [];
};

const makeMainCSS = ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) {
    return [getBaseCSS()];
  }
  if (mainLibrary === MainLibraryEnum.react) {
    return [getBaseCSS('src/index.css'), makeReactAppCSS(entryID)];
  }
  if (mainLibrary === MainLibraryEnum.vue) {
    return [getBaseCSS()];
  }
  if (mainLibrary === MainLibraryEnum.svelte) {
    return [makeSvelteAppCSS(entryID)];
  }
  return [];
};

const utilFuncJS = ({ mainLibrary }: { mainLibrary: MainLibraryEnum }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) return [makeNoLibraryUtil()];
  return [];
};

const makeMainJS = ({ mainLibrary, entryID = 'app', tool }: { mainLibrary: MainLibraryEnum; entryID: string; tool: Tool }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) return [makeNoLibraryJS({ entryID, tool })];
  if (mainLibrary === MainLibraryEnum.react) {
    return [makeReactAppJsx(), makeReactMainJsx(entryID)];
  }
  if (mainLibrary === MainLibraryEnum.vue) {
    return [makeVueMainJs(entryID), makeVueAppComponent(), makeVueHelloWorldComponent()];
  }
  if (mainLibrary === MainLibraryEnum.svelte) {
    return [makeSvelteMainJs(entryID), makeSvelteMainComponent(), makeSvelteCounterComponent()];
  }
  return [];
};

const makeJSON = ({ projectName, depList, mainLibrary }: { projectName: string; depList: Dep[]; mainLibrary: MainLibraryEnum }): File[] => {
  const jsonFiles: File[] = [
    {
      name: 'package.json',
      code: `{
  "name": "${projectName}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  ${makeJSONDepAndDevDeps(depList)}
}`,
      type: 'json'
    }
  ];
  if (mainLibrary === MainLibraryEnum.svelte) {
    jsonFiles.push(makeSvelteConfigJSON());
    return jsonFiles;
  }
  return jsonFiles;
};
