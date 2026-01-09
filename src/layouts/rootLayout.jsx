import React, { useState, useEffect, useRef } from 'react' // useRef qo'shildi
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingBar from 'react-top-loading-bar' // Import qilish
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer'

const RootLayout = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname, hash } = useLocation();
  
  // Loading bar uchun ref
  const loadingRef = useRef(null);

  // 1. Sahifa almashganda Loading bar va Scroll To Top
  useEffect(() => {
    // Progress barni boshlash
    loadingRef.current.continuousStart();

    if (!hash) {
      window.scrollTo(0, 0);
    }

    // Biroz vaqtdan keyin (sahifa "yuklangach") progress barni tugatish
    const timer = setTimeout(() => {
      loadingRef.current.complete();
    }, 500); // 500ms dan keyin tugaydi

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  // 2. Navbar skroll mantiqi (o'zgarishsiz qoladi)
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* LOADING BAR KOMPONENTI */}
      <LoadingBar 
        color="#0e7490" // Chiziq rangi (ko'k yoki brendingizga mos rang)
        ref={loadingRef} 
        height={3} // Chiziq qalinligi
        shadow={true} // Soyali effekt
      />

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