import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardLayout from './components/DashboardLayout'
import CoursePage from './components/CoursePage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="course" element={<CoursePage />} />
          
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
