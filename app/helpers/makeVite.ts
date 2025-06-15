import { depList } from '../constants/constants';
import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';
import { Dep } from '../interfaces/Dep';
import { File } from '../interfaces/File';
import { makeJSONDepAndDevDeps } from '../utils/utils';
import { getBaseCSS, getReactAppCSS, getReactAppJsx, getReactMainJsx } from './getStarterFile';

export const makeVite = (): {
  html: ({ entryID, mainLibrary }: { entryID?: string; mainLibrary: MainLibraryEnum }) => File;
  json: ({ projectName, depList }: { projectName: string; depList: Dep[] }) => File;
  css: ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }) => File[];
  entry: ({ mainLibrary }: { mainLibrary: MainLibraryEnum }) => File[];
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
  if (mainLibrary === MainLibraryEnum.react) {
    return [
      {
        name: 'vite.config.js',
        code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})`,
        type: 'js'
      }
    ];
  }
  return [];
};

export const makeMainLibraryDependencies = (mainLibrary: MainLibraryEnum) => {
  const mainLibraries = depList.find((d) => d.title === DepTitleEnum.mainLibrary);
  if (!mainLibraries) throw new Error('mainLibraries not found.');
  if (mainLibrary === MainLibraryEnum.react) {
    return mainLibraries.deps.find((m) => m.name === MainLibraryEnum.react)?.dependencies ?? [];
  } else return [];
};

const makeMainCSS = ({ mainLibrary, entryID }: { mainLibrary: MainLibraryEnum; entryID: string }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary) {
    return [getBaseCSS()];
  }
  if (mainLibrary === MainLibraryEnum.react) {
    return [getBaseCSS('src/index.css'), getReactAppCSS(entryID)];
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

const makeMainJS = ({ mainLibrary }: { mainLibrary: MainLibraryEnum }): File[] => {
  if (mainLibrary === MainLibraryEnum.noLibrary)
    return [
      {
        name: 'src/main.js',
        code: `import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = \`
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
\`

setupCounter(document.querySelector('#counter'))
`,
        type: 'js'
      }
    ];
  if (mainLibrary === MainLibraryEnum.react) {
    return [getReactAppJsx(), getReactMainJsx()];
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
    <title>Vite App</title>
  </head>
  <body>
    <div id="${entryID}"></div>
    <script type="module" src="/src/main.js${mainLibrary === MainLibraryEnum.react ? 'x' : ''}"></script>
  </body>
</html>
`,
  type: 'html'
});

const makeJSON = ({ projectName, depList }: { projectName: string; depList: Dep[] }): File => {
  return {
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
  };
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
