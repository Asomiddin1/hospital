import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Layoutlar
import RootLayout from './layouts/rootLayout'
import AuthLayout from './layouts/AuthLayout'

// Sahifalar
import Homepage from './pages/homepage'
import Services from './pages/services'
import OurTeams from './pages/our-teams'
import Contact from './pages/contact'
import Register from './auth/register'
import Login from './auth/login'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Oddiy sahifalar uchun RootLayout (navbar + footer bor) */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<OurTeams />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth sahifalari uchun alohida layout (navbar va footer yo'q) */}
        <Route element={<AuthLayout />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          
          {/* Kelajakda qo'shish mumkin bo'lgan boshqa auth sahifalari */}
          {/* <Route path="auth/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="auth/reset-password" element={<ResetPassword />} /> */}
        </Route>

        {/* 404 sahifasi (ixtiyoriy) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </>
    )
  )

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <RouterProvider router={router} />
    </div>
  )
}

export default App