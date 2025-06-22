import type { File } from '@/app/interfaces/File';
import { Tool } from '@/app/interfaces/Tool';

export const makeNoLibraryJS = ({ entryID = 'app', tool }: { entryID?: string; tool: Tool }): File => ({
  name: 'src/main.js',
  code: `import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#${entryID}').innerHTML = \`
  <div>
    <h1>Hello ${tool}!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
\`

setupCounter(document.querySelector('#counter'))
`,
  type: 'js'
});

export const makeNoLibraryUtil = (): File => ({
  name: 'src/counter.js',
  code: `export function setupCounter(element) {
let counter = 0
const setCounter = (count) => {
counter = count
element.innerHTML = \`count is \${counter}\`
}
element.addEventListener('click', () => setCounter(counter + 1))
setCounter(0)
}
`,
  type: 'js'
});
