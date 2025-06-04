import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './components.module.css';

const extensionToPrismLanguage = {
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

export default function CodeBox({ children, extKey }: { children: string; extKey: keyof typeof extensionToPrismLanguage }) {
  const codeClassName = extensionToPrismLanguage[extKey] || '';
  return (
    <div className={styles.codeBox}>
      <pre className={styles.codeBoxPre}>
        <SyntaxHighlighter language={codeClassName} style={docco}>
          {children}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}
