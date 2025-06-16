import { File } from '../interfaces/File';
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

export const getReactAppCSS = (entryID = 'app'): File => {
  return {
    name: 'src/App.css',
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
  };
};

export const getReactMainJsx = (entryID = 'app'): File => {
  return {
    name: 'src/main.jsx',
    code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('${entryID}')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
        `,
    type: 'jsx'
  };
};

export const getReactAppJsx = (): File => {
  return {
    name: 'src/App.jsx',
    code: `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
`,
    type: 'jsx'
  };
};

export const makeVueMainJs = (entryID: string): File => ({
  name: 'src/main.js',
  code: `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#${entryID}')`,
  type: 'js'
});

export const makeVueAppComponent = (): File => ({
  name: 'src/App.vue',
  code: `<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
`,
  type: 'vue'
});

export const makeVueHelloWorldComponent = (): File => ({
  name: 'src/components/HelloWorld.vue',
  code: `<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
`,
  type: 'vue'
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
