import CodeBox, { extensionToPrismLanguage } from './CodeBox';
import FileList from './FileList';
import styles from './fileBrowser.module.css';
interface FileBrowserProps {
  code: string;
  extKey: keyof typeof extensionToPrismLanguage;
  files: string[];
}

export default function FileBrowser({ code, extKey, files }: FileBrowserProps) {
  return (
    <div className={styles.fileBrowser}>
      <FileList files={files} />
      <CodeBox extKey={extKey}>{code}</CodeBox>
    </div>
  );
}
