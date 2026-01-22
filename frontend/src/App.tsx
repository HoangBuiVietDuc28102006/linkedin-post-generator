import './App.css'

import { Button } from "@/components/ui/button"

function App() {

  return (
    <>
      <Button>Generate Post</Button>
      <Button variant="secondary">Regenerate</Button>
      <Button variant="ghost" size="sm">Cancel</Button>
    </>
  )
}

export default App
