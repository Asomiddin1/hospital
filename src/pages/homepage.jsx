import React from 'react'
import TotalCareModel from '../components/about/total-core'
import DoctorTeam from '../components/about/doctor-team'
import Testimonials from '../components/about/testimonials'

const Homepage = () => {
  return (
    <div className='w-full'>
      {/* Rasm qismi */}
      <div className='custom_home_bg w-full min-h-[80vh] md:min-h-screen relative mt-10'>
         {/* Agar rasm ustida matn bo'lsa, shu yerga yozasiz */}
      </div>

      {/* Kontent qismi */}
      <div className='relative z-10 bg-white'>
        <TotalCareModel />
        <DoctorTeam />
        <Testimonials />
      </div>
    </div>
  )
}

export default Homepage