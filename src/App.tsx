import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { PortfolioPage } from '@/pages/PortfolioPage'

// Not linked from anywhere in the public site — kept out of the main
// bundle so visitors never even download the admin code.
const AdminApp = lazy(() => import('@/admin/AdminApp').then((m) => ({ default: m.AdminApp })))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <AdminApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
