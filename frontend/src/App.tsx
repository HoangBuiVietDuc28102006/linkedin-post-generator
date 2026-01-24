import './App.css'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/dropdown"

function App() {

  return (
    <>
      <div className="space-y-3 p-5 bg-blue-300">
        <label className="text-sm font-semibold font-sans bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Description
        </label>
        <Textarea placeholder="Short description…" />
      </div>

      <div className="space-y-3 p-5 bg-blue-200">
        Topic
        <Select>
          <option value="" disabled selected hidden>Pick a Topic (e.g. AI, Finance)</option>
          <option value="ai">AI</option>
          <option value="finance">Finance</option>
          <option value="career">Career</option>
          <option value="education">Education</option>
        </Select>
        Keyword
        <Input placeholder="Choose a Keywords" />
        Tone of Voice
        <Select>
          <option value="" disabled selected hidden>Select a Tone</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="witty">Witty</option>
          <option value="funny">Funny</option>
          <option value="Informational">Informational</option>
        </Select>
        Word Length
        <Input type="number" placeholder="Approximately Length" />

      </div>
      <div className="space-y-1 p-5 bg-blue-100">
        <Button>Generate Post</Button>
        <Button variant="secondary">Regenerate</Button>
        <Button variant="ghost" size="sm">Cancel</Button>
      </div>

    </>
  )
}

export default App
