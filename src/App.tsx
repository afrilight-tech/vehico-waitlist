import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UnderContstruction from './pages/under-construction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UnderContstruction/>
    </>
  )
}

export default App
