import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';
import { DepSelect } from '../interfaces/Dep';
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

export const depList: DepSelect[] = [
  {
    title: DepTitleEnum.mainLibrary,
    deps: [
      {
        name: MainLibraryEnum.noLibrary
      },
      {
        name: MainLibraryEnum.react,
        dependencies: [
          {
            name: 'react',
            version: '^19'
          },
          {
            name: 'react-dom',
            version: '^19'
          },
          {
            name: '@types/react',
            version: '^19',
            isDevDep: true
          },
          {
            name: '@types/react-dom',
            version: '^19',
            isDevDep: true
          },
          {
            name: '@vitejs/plugin-react',
            version: '^4',
            isDevDep: true
          }
        ]
      },
      {
        name: MainLibraryEnum.vue
      },
      {
        name: MainLibraryEnum.svelte
      }
    ]
  }
];

export const initialDepSelectMap: Record<DepTitleEnum, number> = {
  [DepTitleEnum.mainLibrary]: 0
};
