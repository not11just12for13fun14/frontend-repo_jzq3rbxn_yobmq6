import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import PublicProfile from './pages/PublicProfile'
import AuthPage from './pages/Auth'
import LogoutPage from './pages/Logout'
import DashboardFull from './pages/DashboardFull'
import AdminPage from './pages/Admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/p/:slug" element={<PublicProfile />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/dashboard" element={<DashboardFull />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
