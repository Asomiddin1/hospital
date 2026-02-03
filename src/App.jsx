import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Layoutlar
import RootLayout from './layouts/rootLayout'
import AuthLayout from './layouts/AuthLayout'

// Sahifalar (Public)
import Homepage from './pages/patient/homepage'
import Services from './pages/patient/services'
import OurTeams from './pages/patient/our-teams'
import Contact from './pages/patient/contact'

// Auth
import Register from './auth/register'
import Login from './auth/login'

// Dashboardlar (Himoyalangan sahifalar)
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientProfile from './pages/patient/Profile' // Bemor kabineti
import OperatorDashboard from './pages/operator/opertor-dashboard'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 1. ASOSIY SAYT (Navbar + Footer bor) */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="services" element={<Services />} />
          <Route path='team' element={<OurTeams />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* 2. AUTH SAHIFALARI (Toza ekran) */}
        <Route element={<AuthLayout />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Route>

        {/* 3. DASHBOARDLAR (Navbar va Footer YO'Q, o'zining Sidebari bor) */}
        {/* Bu yerda RootLayout ishlatilmaydi, shuning uchun Public Navbar ko'rinmaydi */}
        
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/operator-dashboard" element={<OperatorDashboard />} />

        {/* Agar operator dashboard bo'lsa: */}
        {/* <Route path="/operator-dashboard" element={<OperatorDashboard />} /> */}

      </>
    )
  )

  return (
    <div className="w-full mx-auto">
      <RouterProvider router={router} />
    </div>
  )
}

export default App