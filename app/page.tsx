'use client';
import { useState } from 'react';
import Downloader from './components/Downloader/Downloader';
import { extensionToPrismLanguage } from './components/FileBrowser/CodeBox';
import FileBrowser from './components/FileBrowser/FileBrowser';

export interface File {
  name: string;
  code: string;
  type: keyof typeof extensionToPrismLanguage;
}

const files: File[] = [
  {
    name: 'index.html',
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>Empty project</title>
      <meta charset="utf-8">
      <link href="main.css" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>`,
    type: 'html'
  },
  {
    name: 'package.json',
    code: `{
  "name": "empty-project",
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
    "webpack": "^5.99.9",
    "webpack-cli": "^6.0.1"
  }
}`,
    type: 'json'
  }
];
export default function Home() {
  const [projectName, setProjectName] = useState('App Starter Project');
  return (
    <>
      <main className="py-20 px-12 flex flex-col items-center gap-5">
        <h1 className="text-blue text-5xl text-hover:red cursor-default">App Starter Creator</h1>
        <p>Frontend apps starter generator</p>
        <div className="flex gap-5">
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Vite</span>
          </label>
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Webpack</span>
          </label>
          <label className="flex gap-1">
            <input type="radio" name="build-tool" />
            <span>Rspack</span>
          </label>
        </div>
        <div className="flex gap-2">
          <Downloader files={files} projectName={projectName} setProjectName={setProjectName} />
          <FileBrowser files={files} />
        </div>
      </main>
    </>
  );
}
