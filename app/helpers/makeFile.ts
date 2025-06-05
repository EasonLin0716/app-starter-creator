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

export const makeFile = (tool: Tool, { projectName = 'app_starter' }: { projectName: string }) => {
  const fileFunctionMap: Record<Tool, (projectName: string) => File[]> = {
    Webpack: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      }),
      makeWebpackIndexJS(),
      makeWebpackConfig()
    ],
    Vite: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      })
    ],
    RSPack: (projectName: string) => [
      makeHTML(),
      makeJSON({
        projectName
      })
    ]
  };

  return sortFile(fileFunctionMap[tool](projectName));
};
