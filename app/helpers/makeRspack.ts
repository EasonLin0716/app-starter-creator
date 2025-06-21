import { File } from '../interfaces/File';
import { generateExportStatements, generateImportStatements } from '../utils/generateCodes';
import { makeGitIgnore, makeREADME } from './makeStarterFile';

export const makeRspack = (): { json: ({ projectName }: { projectName: string }) => File; css: () => File; entry: () => File; config: () => File; default: ({ projectName }: { projectName: string }) => File[] } => ({
  json: makeJSON,
  css: makeMainCSS,
  entry: makeMainJS,
  config: makeConfig,
  default: makeDefault
});

const makeMainJS = (): File => ({
  name: 'src/index.js',
  code: `import './index.css';

document.querySelector('#root').innerHTML = \`
<div class="content">
  <h1>Vanilla Rsbuild</h1>
  <p>Start building amazing things with Rsbuild.</p>
</div>
\`;
`,
  type: 'js'
});

const makeMainCSS = (): File => ({
  name: 'src/index.css',
  code: `body {
  margin: 0;
  color: #fff;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  background-image: linear-gradient(to bottom, #020917, #101725);
}

.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
`,
  type: 'css'
});

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
