import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "./components/ui/button"

function CreatePostPage() {
  return <div className="p-6 text-white"><Button>Generate Post</Button></div>
}

function HistoryPage() {
  return <div className="p-6 text-white">History</div>
}

function SettingsPage() {
  return <div className="p-6 text-white">Settings</div>
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<CreatePostPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppShell>
  )
}
