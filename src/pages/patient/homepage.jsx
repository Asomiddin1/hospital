import { motion } from 'framer-motion'
import TotalCareModel from '../../components/about/total-core'
import DoctorTeam from '../../components/about/doctor-team'
import Testimonials from '../../components/about/testimonials'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='w-full overflow-hidden'>
      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className='custom_home_bg w-full min-h-[85vh] md:min-h-screen relative flex items-end justify-end'
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className='container mx-auto px-6 lg:px-16 relative z-10 flex justify-end pb-10 md:pb-16'>
          {/* pb-10 orqali eng pastki chetdan biroz nafas oladigan masofa qoldirdik */}
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }} // Pastdan chiqib kelish
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='max-w-[380px] w-full' 
          >
            {/* Glass Card - Eng pastki o'ng burchak */}
            <div className="backdrop-blur-2xl bg-white/10 p-6 rounded-[2rem] border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-100 text-[10px] font-bold uppercase tracking-tighter">
                  24/7 Tezkor Yordam
                </span>
              </div>
              
              <h1 className='text-2xl md:text-3xl font-black text-white leading-tight'>
                Sog'ligingiz <br /> 
                <span className='text-blue-400'>Xavfsiz Qo'llarda</span>
              </h1>
              
              <p className='mt-3 text-white/80 text-xs md:text-sm leading-relaxed'>
                Bizning professional jamoamiz sizga eng yuqori darajadagi tibbiy xizmatni taqdim etadi.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/contact">
                  <button className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg border border-blue-700 backdrop-blur-md transition-all active:scale-95 w-full">
                   Biz bilan bog'lanish
                  </button>
                </Link>
                <Link to="/services">
                  <button className="py-2.5 bg-transparent hover:bg-blue-600 text-white text-[10px] font-bold rounded-lg border  backdrop-blur-md transition-all active:scale-95 w-full">
                    Xizmatlarimiz
                  </button>
                  
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. KONTENT QISMI */}
      <div className='relative z-10 bg-white'>
        <TotalCareModel />
        <DoctorTeam />
        <Testimonials />
      </div>
    </div>
  )
}

export default Homepage