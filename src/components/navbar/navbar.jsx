import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '../../assets/logo.jpg';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/services' },
  { name: 'Our Team', href: '/team' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hozirgi yo'lni kuzatish uchun

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hozirgi link aktivligini tekshirish funksiyasi
  const checkActive = (linkHref) => {
    const currentPath = location.pathname + location.hash;
    // Agar biz '/'damiz va hash bo'lmasa, Home aktiv bo'lsin
    if (location.pathname === '/' && location.hash === '' && linkHref === '/#home') return true;
    return currentPath === linkHref || location.pathname === linkHref;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
      scrolled || isOpen ? 'bg-[#0e7490] shadow-2xl py-3' : 'bg-transparent'
    }`}>
      
      {/* LOGOTIP */}
      <NavHashLink smooth to="/#home" className="flex items-center gap-2 z-[110]">
        <img className="w-10 h-10 rounded-xl" src={Logo} alt="Logo" />
        <h1 className="text-xl font-black text-white uppercase tracking-tighter">MedixWeb</h1>
      </NavHashLink>

      {/* DESKTOP MENU - Active Pill Effekti bilan */}
      <ul className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
        {navLinks.map((link) => {
          const isActive = checkActive(link.href);
          return (
            <li key={link.name} className="relative">
              <NavHashLink
                smooth
                to={link.href}
                className={`relative px-5 py-2 text-sm font-bold transition-all duration-300 block z-10 ${
                  isActive ? 'text-[#0e7490]' : 'text-white hover:text-blue-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill" // Bu barcha linklar orasida oq fonning silliq siljishini ta'minlaydi
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {link.name}
              </NavHashLink>
            </li>
          );
        })}
      </ul>

      {/* CTA & HAMBURGER */}
      <div className="flex items-center gap-4">
         <button className="hidden sm:flex items-center gap-2 md:gap-3 bg-white text-[#0e7490] pl-4 pr-1.5 md:pl-6 md:pr-2 py-1.5 md:py-2 rounded-full font-bold hover:shadow-lg transition-all group shrink-0">
          <span className="text-xs md:text-sm whitespace-nowrap cursor-pointer">Book Appointment</span>
          <div className="bg-[#0e7490] p-1.5 rounded-full text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
            <ArrowRight size={14} className="md:w-[18px] md:h-[18px] cursor-pointer" />
          </div>
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-[110]">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#0e7490] flex flex-col items-center justify-center gap-8 z-[100]"
          >
            {navLinks.map((link) => (
              <NavHashLink
                key={link.name}
                smooth
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-black transition-all ${
                  checkActive(link.href) ? 'text-blue-200' : 'text-white'
                }`}
              >
                {link.name}
              </NavHashLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;