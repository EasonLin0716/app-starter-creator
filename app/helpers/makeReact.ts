import type { File } from '../interfaces/File';
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
