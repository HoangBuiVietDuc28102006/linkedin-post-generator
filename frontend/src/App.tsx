import { Routes, Route, Navigate } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import GeneratePostPage from "@/pages/generate"

export default function App() {
  return (
    <AppShell>
      <Routes>
        {/* Redirect root to /generate */}
        <Route path="/" element={<Navigate to="/generate" replace />} />

        {/* Main page */}
        <Route path="/generate" element={<GeneratePostPage />} />

        {/* Future routes */}
        {/* <Route path="/history" element={<HistoryPage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
    </AppShell>
  )
}
