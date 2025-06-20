import type { File } from '../../interfaces/File';
export const makeSvelteMainComponent = (): File => ({
  name: 'src/App.svelte',
  code: `<script>
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
`,
  type: 'svelte'
});

export const makeSvelteCounterComponent = (): File => ({
  name: 'src/lib/Counter.svelte',
  code: `<script>
  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<button onclick={increment}>
  count is {count}
</button>`,
  type: 'svelte'
});

export const makeSvelteAppCSS = (entryID: string): File => ({
  name: 'src/app.css',
  code: `#${entryID} {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.card {
  padding: 2em;
}
`,
  type: 'css'
});

export const makeSvelteMainJs = (entryID: string): File => ({
  name: 'src/main.js',
  code: `import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('${entryID}'),
})

export default app
`,
  type: 'js'
});

export const makeSvelteConfigJSON = (): File => ({
  name: 'jsconfig.json',
  code: `{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "target": "ESNext",
    "module": "ESNext",
    /**
     * svelte-preprocess cannot figure out whether you have
     * a value or a type, so tell TypeScript to enforce using
     * \`import type\` instead of \`import\` for Types.
     */
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    /**
     * To have warnings / errors of the Svelte compiler at the
     * correct position, enable source maps by default.
     */
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    /**
     * Typecheck JS in \`.svelte\` and \`.js\` files by default.
     * Disable this if you'd like to use dynamic types.
     */
    "checkJs": true
  },
  /**
   * Use global.d.ts instead of compilerOptions.types
   * to avoid limiting type declarations.
   */
  "include": ["src/**/*.d.ts", "src/**/*.js", "src/**/*.svelte"]
}`,
  type: 'json'
});
