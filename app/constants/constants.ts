import { Dep, DepTitleEnum } from '../interfaces/Dep';

export const prismLanguageMap = {
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

export const tools = ['Vite', 'Webpack', 'Rspack'] as const;

export const depList: Dep[] = [
  {
    title: DepTitleEnum.mainLibrary,
    deps: ['No library', 'react', 'vue', 'svelte']
  }
];

export const initialDepSelectMap: Record<DepTitleEnum, number> = {
  [DepTitleEnum.mainLibrary]: 0
};
