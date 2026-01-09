import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom' // useLocation qo'shildi
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer'

const RootLayout = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname, hash } = useLocation(); // Hozirgi manzilni kuzatamiz

  // 1. Sahifa almashganda tepaga qaytarish (Scroll to Top)
  useEffect(() => {
    // Agar URL ichida #hash bo'lmasa (masalan #testimonials), tepaga chiqar
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // pathname o'zgarganda ishlaydi

  // 2. Navbar ko'rinishini skrollga qarab boshqarish
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false); // Pastga skroll qilinganda yashir
        } else {
          setIsVisible(true);  // Tepaga skroll qilinganda ko'rsat
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className='fixed top-0 left-0 right-0 z-[100]'
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default RootLayout;