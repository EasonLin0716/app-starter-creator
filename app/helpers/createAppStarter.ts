import { MainLibraryEnum } from '../enums/DepEnums';
import { File } from '../interfaces/File';
import { Tool } from '../interfaces/Tool';
import { sortFile } from '../utils/sortFile';
import { makeRspack } from './makeRspack';
import { makeMainLibraryDependencies, makeVite, VITE_DEP } from './makeVite';
import { makeWebpack } from './makeWebpack';

export const createAppStarter = (tool: Tool, { projectName, mainLibrary, entryID }: { projectName: string; mainLibrary: MainLibraryEnum; entryID: string }) => {
  const fileFunctionMap: Record<Tool, (projectName: string, entryID: string) => File[]> = {
    Webpack: (projectName: string) => {
      const webpack = makeWebpack();
      return [...webpack.default({ projectName }), webpack.html(), webpack.json({ projectName }), webpack.config(), webpack.entry()];
    },
    Vite: (projectName: string, entryID: string) => {
      const vite = makeVite();
      return [
        ...vite.default({ projectName }),
        ...vite.css({ mainLibrary, entryID }),
        ...vite.entry({ mainLibrary, entryID, tool }),
        ...vite.json({ projectName, depList: [VITE_DEP].concat(makeMainLibraryDependencies(mainLibrary)), mainLibrary }),
        ...vite.util({ mainLibrary }),
        ...vite.config({ mainLibrary }),
        vite.html({ mainLibrary, tool })
      ];
    },
    Rspack: (projectName: string) => {
      const rspack = makeRspack();
      return [
        ...rspack.default({ projectName }),
        rspack.config(),
        ...rspack.css({ mainLibrary, entryID }),
        ...rspack.entry({ mainLibrary, entryID, tool }),
        ...rspack.util({ mainLibrary }),
        rspack.json({ projectName }),
        rspack.html({ mainLibrary, tool })
      ];
    }
  };

  return sortFile(fileFunctionMap[tool](projectName, entryID));
};
