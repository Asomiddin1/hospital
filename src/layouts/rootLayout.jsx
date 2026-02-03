import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingBar from 'react-top-loading-bar'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer'

const RootLayout = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname, hash } = useLocation();
  
  const loadingRef = useRef(null);

  // Navbar va Footer ko'rinmaydigan sahifalar
  const hiddenRoutes = [
    '/auth/login', 
    '/auth/register', 
    '/patient-dashboard', 
    '/doctor-dashboard', 
    '/operator-dashboard'
  ];

  const isHidden = hiddenRoutes.includes(pathname);

  useEffect(() => {
    loadingRef.current.continuousStart();
    if (!hash) window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      loadingRef.current.complete();
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

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
      <LoadingBar color="#0e7490" ref={loadingRef} height={3} shadow={true} />

      {!isHidden && (
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
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isHidden && <Footer />}
    </div>
  )
}

export default RootLayout;