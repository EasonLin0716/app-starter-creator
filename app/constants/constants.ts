import { DepTitleEnum, MainLibraryEnum } from '../enums/DepEnums';
import { DepSelect } from '../interfaces/Dep';

export const DEFAULT_ENTRY_ID = 'app';
export const DEFAULT_PROJECT_NAME = 'app_starter_project';
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

export const tools = ['Vite', 'Rspack', 'Webpack'] as const;

export const toolDescriptions = {
  Vite: '現代化的前端構建工具，提供極快的開發服務器和構建速度',
  Webpack: '強大的模組打包工具，支援多種資源類型和優化選項',
  Rspack: '基於 Rust 的高性能打包工具，與 Webpack 生態系統相容，提供更快的構建速度'
} as const;

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
        name: MainLibraryEnum.vue,
        dependencies: [
          {
            name: 'vue',
            version: '^3'
          },
          {
            name: '@vitejs/plugin-vue',
            version: '^5',
            isDevDep: true
          }
        ]
      },
      {
        name: MainLibraryEnum.svelte,
        dependencies: [
          {
            name: '@sveltejs/vite-plugin-svelte',
            version: '^5',
            isDevDep: true
          },
          {
            name: 'svelte',
            version: '^5',
            isDevDep: true
          }
        ]
      }
    ]
  }
];

export const initialDepSelectMap: Record<DepTitleEnum, number> = {
  [DepTitleEnum.mainLibrary]: 0
};
