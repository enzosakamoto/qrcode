import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Toaster } from './components/ui/toaster'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}
