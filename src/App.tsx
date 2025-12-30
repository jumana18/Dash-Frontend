import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/DashboardLayout";
import CoursePage from "./components/CoursePage";
import Students from "./utils/studentAPI";   // 👈 add this

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Dashboard layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="course" element={<CoursePage />} />
          <Route path="students" element={<Students />} />   {/* 👈 NEW */}
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
