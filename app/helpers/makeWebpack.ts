import { File } from '../interfaces/File';
export const makeWebpack = (): {
  html: () => File;
  json: ({ projectName }: { projectName: string }) => File;
  config: () => File;
  entry: () => File;
  readme: ({ projectName }: { projectName: string }) => File;
} => ({
  html: makeHTML,
  json: makeJSON,
  config: makeConfig,
  entry: makeIndexJS,
  readme: makeREADME
});

const makeHTML = (): File => ({
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

const makeJSON = ({ projectName }: { projectName: string }): File => ({
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

const makeConfig = (): File => ({
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

const makeIndexJS = (): File => ({
  name: 'src/index.js',
  code: `document.querySelector('#app').textContent = 'Hello, world!'`,
  type: 'js'
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

`,
  type: 'md'
});
