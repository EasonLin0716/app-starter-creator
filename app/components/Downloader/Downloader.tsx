import { File } from '@/app/interfaces/File';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import styles from './downloader.module.css';

interface DownloaderProps {
  files: File[];
  projectName: string;
  setProjectName: (projectName: string) => void;
}

const downloadZip = async (files: File[], projectName: string) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file.code);
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName}.zip`);
};

export default function Downloader({ files, projectName, setProjectName }: DownloaderProps) {
  return (
    <div className={styles.downloader}>
      <label className={styles.projectName}>
        Project Name
        <input className={styles.projectNameInput} value={projectName} type="text" onChange={(e) => setProjectName(e.target.value)} />
      </label>
      <button className={styles.button} onClick={() => downloadZip(files, projectName)}>
        Download
      </button>
    </div>
  );
}
