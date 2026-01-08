import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer'

const RootLayout = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Agar 50px dan ko'p scroll qilingan bo'lsa va pastga qarab ketsa - yashir
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setIsVisible(false);
        } else {
          // Tepaga qarab scroll qilsa - ko'rsat
          setIsVisible(true);
        }
        // Oxirgi scroll o'rnini saqlab qolish
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // Tozalash (cleanup)
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className="relative">
      {/* Navbar animatsiyasi */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='fixed top-0 left-0 right-0 z-50'
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout