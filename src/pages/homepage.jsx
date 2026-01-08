import React from 'react'
import TotalCareModel from '../components/about/total-core'
import DoctorTeam from '../components/about/doctor-team'
import Testimonials from '../components/about/testimonials'

const Homepage = () => {
  return (
    <div className='w-full '>
     <div className='custom_home_bg h-screen pt-10 flex flex-col justify-end items-center gap-6'>
        
     </div>
     <div>
        <TotalCareModel />
        <DoctorTeam />
        <Testimonials />
     </div>
    </div>
  )
}

export default Homepage 

