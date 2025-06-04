'use client';
import { useMemo, useState } from 'react';
import type { File } from '../../page';
import CodeBox from './CodeBox';
import FileList from './FileList';
import styles from './fileBrowser.module.css';
interface FileBrowserProps {
  files: File[];
}

export default function FileBrowser({ files }: FileBrowserProps) {
  const fileNames = useMemo(() => files.map((f) => f.name), [files]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.fileBrowser}>
      <FileList fileNames={fileNames} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      <CodeBox extKey={files[selectedIndex].type}>{files[selectedIndex].code}</CodeBox>
    </div>
  );
}
