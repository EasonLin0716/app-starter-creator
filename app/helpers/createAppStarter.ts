import { MainLibraryEnum } from '../enums/DepEnums';
import { File } from '../interfaces/File';
import { Tool } from '../interfaces/Tool';
import { sortFile } from '../utils/sortFile';
import { makeRspack } from './makeRspack';
import { makeGitIgnore } from './makeStarterFile';
import { makeMainLibraryDependencies, makeVite, VITE_DEP } from './makeVite';
import { makeWebpack } from './makeWebpack';

export const createAppStarter = (tool: Tool, { projectName, mainLibrary, entryID }: { projectName: string; mainLibrary: MainLibraryEnum; entryID: string }) => {
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
        ...vite.entry({ mainLibrary, entryID }),
        ...vite.json({ projectName, depList: [VITE_DEP].concat(makeMainLibraryDependencies(mainLibrary)), mainLibrary }),
        ...vite.util({ mainLibrary }),
        ...vite.config({ mainLibrary }),
        vite.html({ mainLibrary }),
        vite.readme({ projectName })
      ];
    },
    Rspack: (projectName: string) => {
      const rspack = makeRspack();
      return [makeGitIgnore(), rspack.config(), rspack.css(), rspack.entry(), rspack.json({ projectName }), rspack.readme({ projectName })];
    }
  };

  return sortFile(fileFunctionMap[tool](projectName, entryID));
};
