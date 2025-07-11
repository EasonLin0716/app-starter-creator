import type { File } from '../interfaces/File';
export { makeReactAppCSS, makeReactAppJsx, makeReactMainJsx } from './mainLibrary/makeReact';
export { makeSvelteAppCSS, makeSvelteConfigJSON, makeSvelteCounterComponent, makeSvelteMainComponent, makeSvelteMainJs } from './mainLibrary/makeSvelte';
export { makeVueAppComponent, makeVueHelloWorldComponent, makeVueMainJs } from './mainLibrary/makeVue';
export const getBaseCSS = (name = 'src/style.css'): File => {
  return {
    name,
    code: `:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`,
    type: 'css'
  };
};

export const makeGitIgnore = (): File => ({
  name: '.gitignore',
  code: `# Local
.DS_Store
*.local
*.log*

# Dist
node_modules
dist/

# IDE
.vscode/*
!.vscode/extensions.json
.idea
`,
  type: 'gitignore'
});

export const makeREADME = ({ projectName }: { projectName: string }): File => ({
  name: 'README.md',
  code: `# ${projectName}

Frontend app starter

## Building and running on localhost

First install dependencies:

\`\`\`sh
npm install
\`\`\`

To create a production build:

\`\`\`sh
npm run build
\`\`\`

To create a development build:

\`\`\`sh
npm run dev
\`\`\`

## Running

\`\`\`sh
node dist/bundle.js
\`\`\`

## Credits

`,
  type: 'md'
});
