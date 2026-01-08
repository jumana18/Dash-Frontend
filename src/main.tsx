import React from 'react'
import ReactDOM from 'react-dom/client'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import CoursePage from './components/CoursePage'
import StudentsPage from './pages/StudentsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TeacherPage from './pages/TeacherPage'



const router = createBrowserRouter([
  {
    path:'',
    element:<App/>,
    children:[
      {
        path:'',
        element:<CoursePage/>
      },
      {
        path:'/student',
        element:<StudentsPage/>
      },
      
      {
           path:'/teacher',
           element:<TeacherPage/>
      },
    ]
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
