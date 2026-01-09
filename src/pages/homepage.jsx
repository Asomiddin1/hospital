import React from 'react'
import { motion } from 'framer-motion'
import TotalCareModel from '../components/about/total-core'
import DoctorTeam from '../components/about/doctor-team'
import Testimonials from '../components/about/testimonials'

const Homepage = () => {
  return (
    <div className='w-full overflow-hidden'>
      {/* 1. HERO SECTION - Rasm qismi */}
      <section 
        id="home" 
        className='custom_home_bg w-full min-h-[85vh] md:min-h-screen relative flex items-center justify-center pt-20'
      >
        {/* Overlay: Rasm ustidagi matnlar yaxshi ko'rinishi uchun */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className='container mx-auto px-6 lg:px-16 relative z-10'>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl'
          >
            {/* Bu yerga Hero matnlarini qo'shishingiz mumkin */}
            <h1 className='text-4xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl'>
              Providing Best <br /> 
              <span className='text-blue-100'>Medical Care.</span>
            </h1>
            <p className='mt-6 text-white/90 text-lg md:text-xl max-w-xl'>
              Bizning klinikamizda eng zamonaviy texnologiyalar va tajribali shifokorlar sizning xizmatingizda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. KONTENT QISMI */}
      <div className='relative z-10 bg-white'>
        {/* About / Total Care bo'limi */}
        <TotalCareModel />
        
        {/* Shifokorlar jamoasi */}
        <DoctorTeam />
        
        {/* Testimonials - Bunga ID komponent ichida berilgan bo'lishi kerak */}
        <Testimonials />
      </div>
    </div>
  )
}

export default Homepage