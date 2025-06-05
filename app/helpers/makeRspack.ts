import { File } from '../interfaces/File';

export const makeRspack = (): { json: ({ projectName }: { projectName: string }) => File; css: () => File; entry: () => File; config: () => File; readme: ({ projectName }: { projectName: string }) => File } => ({
  json: makeJSON,
  css: makeMainCSS,
  entry: makeMainJS,
  config: makeConfig,
  readme: makeREADME
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
  code: `import { defineConfig } from '@rsbuild/core';

export default defineConfig({});
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
