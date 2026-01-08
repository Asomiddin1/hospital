import { ArrowRight, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Our Team', href: '/team' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menyu ochiqligida scrollni bloklash
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 transition-all duration-500 ${
      scrolled ? 'bg-[#0e7490]/90 backdrop-blur-xl py-2 shadow-2xl' : 'bg-transparent'
    }`}>
      
      {/* 1. LOGOTIP - Ekran kichrayganda matn hajmi ham kichrayadi */}
      <div className="flex items-center gap-2 cursor-pointer z-[110]">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
          <div className="w-4 h-4 bg-[#0e7490] rounded-full"></div>
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
          MedixWeb
        </h1>
      </div>

      {/* 2. DESKTOP MENYU - Faqat md (768px) dan yuqori ekranlarda ko'rinadi */}
      <ul className={`relative hidden lg:flex items-center p-1 rounded-full border transition-all duration-300 ${
        scrolled ? 'bg-white/10 border-white/10' : 'bg-white/20 border-white/30 backdrop-blur-md'
      }`}>
        {navLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className="relative px-4 py-1.5 text-sm font-semibold cursor-pointer z-10"
          >
            {activeTab === link.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full shadow-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-20 transition-colors duration-300 whitespace-nowrap ${
              activeTab === link.name ? 'text-[#0e7490]' : scrolled ? 'text-white' : 'text-[#0e7490]'
            }`}>
              {link.name}
            </span>
          </li>
        ))}
      </ul>

      {/* 3. TUGMALAR VA HAMBURGER */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* "Book" tugmasi: Kichik telefonlarda yashiriladi, sm ekranlardan boshlab ko'rinadi */}
        <button className="hidden sm:flex items-center gap-2 md:gap-3 bg-white text-[#0e7490] pl-4 pr-1.5 md:pl-6 md:pr-2 py-1.5 md:py-2 rounded-full font-bold hover:shadow-lg transition-all group shrink-0">
          <span className="text-xs md:text-sm whitespace-nowrap cursor-pointer">Book Appointment</span>
          <div className="bg-[#0e7490] p-1.5 rounded-full text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
            <ArrowRight size={14} className="md:w-[18px] md:h-[18px] cursor-pointer" />
          </div>
        </button>

        {/* Hamburger Icon: Faqat lg (1024px) gacha ko'rinadi */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 4. MOBIL MENYU (OVERLAY) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 w-full h-screen bg-[#0e7490] flex flex-col items-center justify-center gap-6 lg:hidden z-[100] px-6"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-2xl sm:text-3xl font-bold text-white hover:opacity-70 transition-opacity"
              >
                {link.name}
              </motion.a>
            ))}
            
            {/* Mobil menyu ichidagi tugma (faqat juda kichik telefonlarda ko'rinadi) */}
            <button className="sm:hidden flex items-center gap-3 bg-white text-[#0e7490] px-8 py-4 rounded-full font-bold shadow-xl mt-4 cursor-pointer">
              Book Appointment
              <ArrowRight size={20} className="ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar;