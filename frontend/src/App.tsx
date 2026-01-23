import './App.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function App() {

  return (
    <>
      <Button>Generate Post</Button>
      <Button variant="secondary">Regenerate</Button>
      <Button variant="ghost" size="sm">Cancel</Button>

      <div className="space-y-3 p-5 bg-red-100">
        <Input placeholder="Topic (e.g. AI, Finance)" />
        <Input placeholder="Keywords" />
        <Input type="email" placeholder="Email" />
        <Input disabled placeholder="Disabled" />
      </div>

      <div className="space-y-3 p-5 bg-red-500">
        <Textarea placeholder="Short description…" />
        <Textarea rows={6} placeholder="Longer content…" />
        <Textarea disabled placeholder="Disabled textarea" />
      </div>
    </>
  )
}

export default App
