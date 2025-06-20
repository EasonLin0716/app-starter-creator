import { depList } from '../constants/constants';
import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';
import { Dep } from '../interfaces/Dep';
import { File } from '../interfaces/File';
import { makeJSONDepAndDevDeps } from '../utils/utils';
import { makeNoLibraryJS } from './mainLibrary/makeNoLibrary';
import {
  getBaseCSS,
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
  html: ({ entryID, mainLibrary }: { entryID?: string; mainLibrary: MainLibraryEnum }) => File;
  json: ({ projectName, depList, mainLibrary }: { projectName: string; depList: Dep[]; mainLibrary: MainLibraryEnum }) => File[];
  css: ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }) => File[];
  entry: ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }) => File[];
  util: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
  readme: ({ projectName }: { projectName: string }) => File;
  config: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
} => ({
  html: makeHTML,
  json: makeJSON,
  css: makeMainCSS,
  entry: makeMainJS,
  util: utilFuncJS,
  readme: makeREADME,
  config: makeConfig
});

export const VITE_DEP: Dep = {
  name: 'vite',
  version: '^6',
  isDevDep: true
};

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
  if (mainLibrary === MainLibraryEnum.noLibrary)
    return [
      {
        name: 'src/counter.js',
        code: `export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = \`count is \${counter}\`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
`,
        type: 'js'
      }
    ];
  return [];
};

const makeMainJS = ({ mainLibrary, entryID = 'app' }: { mainLibrary: MainLibraryEnum; entryID: string }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) return [makeNoLibraryJS({ entryID })];
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

const makeHTML = ({ entryID = 'app', mainLibrary }: { entryID?: string; mainLibrary: MainLibraryEnum }): File => ({
  name: 'index.html',
  code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + ${mainLibrary}</title>
  </head>
  <body>
    <div id="${entryID}"></div>
    <script type="module" src="/src/main.js${mainLibrary === MainLibraryEnum.react ? 'x' : ''}"></script>
  </body>
</html>
`,
  type: 'html'
});

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

const makeREADME = ({ projectName }: { projectName: string }): File => ({
  name: 'README.md',
  code: `# ${projectName}

Frontend app starter

## Building and running on localhost

First install dependencies:

\`\`\`sh
npm install
\`\`\`

To create a production build:

\`\`\`sh
npm run build
\`\`\`

To create a development build:

\`\`\`sh
npm run dev
\`\`\`

## Running

\`\`\`sh
node dist/bundle.js
\`\`\`

## Credits

`,
  type: 'md'
});
