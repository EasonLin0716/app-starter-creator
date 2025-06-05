import { File } from '../interfaces/File';
import { Tool } from '../interfaces/Tool';
import { sortFile } from './sortFile';

export const makeHTML = (): File => ({
  name: 'index.html',
  code: `<!DOCTYPE html>
<html>
  <head>
    <title>Empty project</title>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/bundle.js"></script>
  </body>
</html>`,
  type: 'html'
});

export const makeJSON = ({ projectName }: { projectName: string }): File => ({
  name: 'package.json',
  code: `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "clean": "rm dist/bundle.js",
    "build-dev": "webpack --mode development",
    "build-prod": "webpack --mode production"
  },
  "dependencies": {},
  "devDependencies": {
    "webpack": "^5",
    "webpack-cli": "^6"
  }
}`,
  type: 'json'
});

export const makeWebpackConfig = (): File => ({
  name: 'webpack.config.js',
  code: `const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};`,
  type: 'js'
});

export const makeWebpackIndexJS = (): File => ({
  name: 'src/index.js',
  code: `document.querySelector('#app').textContent = 'Hello, world!'`,
  type: 'js'
});

export const makeWebpackREADME = ({ projectName }: { projectName: string }): File => ({
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
npm run build-prod
\`\`\`

To create a development build:

\`\`\`sh
npm run build-dev
\`\`\`

## Running

\`\`\`sh
node dist/bundle.js
\`\`\`

## Credits

Made with [createapp.dev](https://createapp.dev/)`,
  type: 'md'
});

export const makeFile = (tool: Tool, { projectName = 'app_starter' }: { projectName: string }) => {
  const fileFunctionMap: Record<Tool, (projectName: string) => File[]> = {
    Webpack: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      }),
      makeWebpackIndexJS(),
      makeWebpackConfig(),
      makeWebpackREADME({ projectName })
    ],
    Vite: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      }),
      makeWebpackREADME({ projectName })
    ],
    RSPack: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      }),
      makeWebpackREADME({ projectName })
    ]
  };

  return sortFile(fileFunctionMap[tool](projectName));
};
