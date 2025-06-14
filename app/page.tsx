'use client';
import { useCallback, useMemo, useState } from 'react';
import DepSelectorGroup from './components/DepSelectorGroup/DepSelectorGroup';
import Downloader from './components/Downloader/Downloader';
import FileBrowser from './components/FileBrowser/FileBrowser';
import ToolSelector from './components/ToolSelector/ToolSelector';
import { depList, initialDepSelectMap, tools } from './constants/constants';
import { DepTitleEnum, MainLibraryEnum } from './enums/DepEnums';
import { makeFile } from './helpers/makeFile';
import type { File } from './interfaces/File';
export default function Home() {
  const [projectName, setProjectName] = useState('app_starter_project');
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const [depSelectMap, setDepSelectMap] = useState({ ...initialDepSelectMap });
  const onSetDepSelectMap = useCallback(
    (dep: DepTitleEnum, newSelected: number) => {
      const newDepSelectMap = { ...depSelectMap };
      newDepSelectMap[dep] = newSelected;
      setDepSelectMap(newDepSelectMap);
    },
    [depSelectMap]
  );
  // TODO: When Main Library is changed, update files
  const files: File[] = useMemo(() => {
    const selectedMainLibrary: MainLibraryEnum = depList[0].deps[depSelectMap[DepTitleEnum.mainLibrary]].name;
    return makeFile(tools[selectedToolIndex], { projectName, mainLibrary: selectedMainLibrary, entryID: 'app' });
  }, [depSelectMap, projectName, selectedToolIndex]);
  return (
    <>
      <main className="py-20 px-12 flex flex-col items-center gap-5">
        <h1 className="text-blue-600 text-5xl cursor-default">App Starter Creator</h1>
        <p>Frontend apps starter generator</p>
        <ToolSelector tools={tools} selectedToolIndex={selectedToolIndex} setSelectedToolIndex={setSelectedToolIndex} />
        <div className="flex gap-2 w-full max-w-1024px">
          <div className="flex flex-col gap-4">
            <DepSelectorGroup depList={depList} depSelectMap={depSelectMap} onSetDepSelectMapAction={onSetDepSelectMap} />
            <Downloader files={files} projectName={projectName} setProjectName={setProjectName} />
          </div>
          <FileBrowser files={files} />
        </div>
      </main>
    </>
  );
}
