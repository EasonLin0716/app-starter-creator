import styles from './fileBrowser.module.css';

interface FileListProps {
  files: string[];
}

export default function FileList({ files }: FileListProps) {
  return (
    <div className={styles.files}>
      <ul>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}
