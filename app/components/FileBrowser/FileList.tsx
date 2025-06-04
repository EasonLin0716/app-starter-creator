import styles from './fileBrowser.module.css';

interface FileListProps {
  fileNames: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export default function FileList({ fileNames, selectedIndex, setSelectedIndex }: FileListProps) {
  return (
    <div className={styles.files}>
      <ul>
        {fileNames.map((fileName, index) => (
          <li key={index} className={selectedIndex === index ? styles.selected : ''} onClick={() => setSelectedIndex(index)}>
            {fileName}
          </li>
        ))}
      </ul>
    </div>
  );
}
