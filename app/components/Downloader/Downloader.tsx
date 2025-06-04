import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { File } from '../../page';
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
      <p className={styles.projectName}>Project Name</p>
      <input className="p-2" value={projectName} type="text" onChange={(e) => setProjectName(e.target.value)} />
      <button className={styles.button} onClick={() => downloadZip(files, projectName)}>
        Download
      </button>
    </div>
  );
}
