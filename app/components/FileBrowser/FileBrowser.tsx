'use client';
import { useEffect, useMemo, useState } from 'react';
import type { File } from '../../interfaces/File';
import CodeBox from './CodeBox';
import FileList from './FileList';
import styles from './fileBrowser.module.css';
interface FileBrowserProps {
  files: File[];
  depSelectMap: Record<string, number>;
}

export default function FileBrowser({ files, depSelectMap }: FileBrowserProps) {
  const fileNames = useMemo(() => files.map((f) => f.name), [files]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSelectedIndex(0);
  }, [depSelectMap]);
  return (
    <div className={styles.fileBrowser}>
      <FileList fileNames={fileNames} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      <CodeBox extKey={files[selectedIndex].type}>{files[selectedIndex].code}</CodeBox>
    </div>
  );
}
