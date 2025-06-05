'use client';
import { useMemo, useState } from 'react';
import Downloader from './components/Downloader/Downloader';
import FileBrowser from './components/FileBrowser/FileBrowser';
import ToolSelector from './components/ToolSelector/ToolSelector';
import { tools } from './constants/constants';
import { makeFile } from './helpers/makeFile';
import type { File } from './interfaces/File';
export default function Home() {
  const [projectName, setProjectName] = useState('app_starter_project');
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const files: File[] = useMemo(() => makeFile(tools[selectedToolIndex], { projectName }), [projectName, selectedToolIndex]);
  return (
    <>
      <main className="py-20 px-12 flex flex-col items-center gap-5">
        <h1 className="text-blue-600 text-5xl cursor-default">App Starter Creator</h1>
        <p>Frontend apps starter generator</p>
        <ToolSelector tools={tools} selectedToolIndex={selectedToolIndex} setSelectedToolIndex={setSelectedToolIndex} />
        <div className="flex gap-2 w-full max-w-1024px">
          <Downloader files={files} projectName={projectName} setProjectName={setProjectName} />
          <FileBrowser files={files} />
        </div>
      </main>
    </>
  );
}
