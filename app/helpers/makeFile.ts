import { MainLibraryEnum } from '../enums/DepEnums';
import { File } from '../interfaces/File';
import { Tool } from '../interfaces/Tool';
import { makeRspack } from './makeRspack';
import { makeMainLibraryDependencies, makeVite, VITE_DEP } from './makeVite';
import { makeWebpack } from './makeWebpack';
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

const makeGitIgnore = (): File => ({
  name: '.gitignore',
  code: `# Local
.DS_Store
*.local
*.log*

# Dist
node_modules
dist/

# IDE
.vscode/*
!.vscode/extensions.json
.idea
`,
  type: 'gitignore'
});

export const makeFile = (tool: Tool, { projectName = 'app_starter', mainLibrary = MainLibraryEnum.noLibrary, entryID }: { projectName: string; mainLibrary: MainLibraryEnum; entryID: string }) => {
  const fileFunctionMap: Record<Tool, (projectName: string, entryID: string) => File[]> = {
    Webpack: (projectName: string) => {
      const webpack = makeWebpack();
      return [makeGitIgnore(), webpack.html(), webpack.json({ projectName }), webpack.config(), webpack.entry(), webpack.readme({ projectName })];
    },
    Vite: (projectName: string, entryID: string) => {
      const vite = makeVite();
      return [
        makeGitIgnore(),
        ...vite.css({ mainLibrary, entryID }),
        ...vite.entry({ mainLibrary }),
        vite.html({ mainLibrary }),
        vite.json({ projectName, depList: [VITE_DEP].concat(makeMainLibraryDependencies(MainLibraryEnum.react)) }),
        vite.readme({ projectName }),
        ...vite.util({ mainLibrary }),
        ...vite.config({ mainLibrary })
      ];
    },
    Rspack: (projectName: string) => {
      const rspack = makeRspack();
      return [makeGitIgnore(), rspack.config(), rspack.css(), rspack.entry(), rspack.json({ projectName }), rspack.readme({ projectName })];
    }
  };

  return sortFile(fileFunctionMap[tool](projectName, entryID));
};
