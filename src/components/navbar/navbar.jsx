import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, User } from 'lucide-react';
import Logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkActive = (linkHref) => {
    const currentPath = location.pathname + location.hash;
    if (location.pathname === '/' && location.hash === '' && linkHref === '/#home') return true;
    return currentPath === linkHref;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 ${
      scrolled || isOpen ? 'bg-[#0e7490] shadow-xl py-2' : 'bg-transparent'
    }`}>
      
      {/* 1. LOGO SECTION */}
      <div className="flex items-center z-[110]">
        <NavHashLink smooth to="/#home" className="flex items-center gap-2">
          <img className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover" src={Logo} alt="Logo" />
          <h1 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">MedixWeb</h1>
        </NavHashLink>
      </div>

      {/* 2. DESKTOP MENU - Faqat XL va undan kattalar uchun */}
      <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <li key={link.name} className="relative">
                <NavHashLink
                  smooth
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 block z-10 ${
                    isActive ? 'text-[#0e7490]' : 'text-white hover:text-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </NavHashLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. CTA BUTTONS */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Book Appointment - Faqat MD ekranlardan boshlab ko'rinadi */}
        <button className="hidden md:flex items-center gap-2 bg-white text-[#0e7490] pl-4 pr-1.5 py-1.5 rounded-full font-bold hover:shadow-lg transition-all group cursor-pointer">
          <span className="text-xs lg:text-sm whitespace-nowrap">Book Appointment</span>
          <div className="bg-[#0e7490] p-1 rounded-full text-white group-hover:rotate-[-45deg] transition-transform">
            <ArrowRight size={14} />
          </div>
        </button>

        {/* Sign In - Faqat LG ekranlarda */}
        <Link to={'/auth/login'}>
        <button className="hidden lg:flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full text-[#0e7490] text-sm font-bold bg-white hover:text-[#014457] transition-all cursor-pointer">
          <User size={16} />
          Sign In
        </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="xl:hidden p-2 text-white z-[110] bg-white/10 rounded-lg border border-white/20 active:scale-95 transition-transform"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 4. MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] xl:hidden" 
            />
            
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }} 
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#0e7490] shadow-2xl z-[105] p-6 flex flex-col xl:hidden"
            >
              <div className="flex flex-col gap-4 mt-20">
                {navLinks.map((link) => {
                  const isActive = checkActive(link.href);
                  return (
                    <NavHashLink 
                      key={link.name} 
                      smooth 
                      to={link.href} 
                      onClick={() => setIsOpen(false)} 
                      className={`text-lg font-semibold py-3 px-4 rounded-xl transition-all ${
                        isActive ? 'bg-white text-[#0e7490]' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </NavHashLink>
                  );
                })}
              </div>  

              <div className="mt-auto space-y-3">
                <Link to={'/auth/login'}>
                <button className="w-full flex items-center justify-center gap-2 py-3.5 border border-white/20 rounded-xl text-[white] font-bold bg-white/10 mb-3">
                  <User size={18} /> Sign In
                </button>
                </Link>
                <button className="w-full py-3.5 bg-white text-[#0e7490] rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  Book Now <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;