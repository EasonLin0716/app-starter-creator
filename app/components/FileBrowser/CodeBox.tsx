import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './fileBrowser.module.css';

export const extensionToPrismLanguage = {
  babelrc: 'javascript',
  css: 'css',
  gitignore: 'bash',
  html: 'html',
  js: 'javascript',
  jsx: 'jsx',
  json: 'json',
  less: 'less',
  md: 'markdown',
  scss: 'scss',
  styl: 'stylus',
  svelte: 'markup',
  ts: 'typescript',
  tsx: 'tsx',
  vue: 'markup'
};

interface CodeBoxProps {
  children: string;
  extKey: keyof typeof extensionToPrismLanguage;
}

export default function CodeBox({ children, extKey }: CodeBoxProps) {
  const codeClassName = extensionToPrismLanguage[extKey] || '';
  return (
    <div className={styles.codeBox}>
      <pre className={styles.codeBoxPre}>
        <SyntaxHighlighter language={codeClassName} style={materialDark}>
          {children}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}
