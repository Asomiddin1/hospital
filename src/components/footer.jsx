import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0e7490] text-white pt-10 pb-5 overflow-hidden relative">
      {/* Dekorativ effektlar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brend haqida */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-[#0e7490] rounded-full"></div>
              </div>
              <h1 className="text-2xl font-black tracking-tight">MedixWeb</h1>
            </div>
            <p className="text-blue-100/70 leading-relaxed text-sm">
              Zamonaviy tibbiyot va texnologiya uyg'unligi. Biz sizning salomatligingiz uchun eng ilg'or yechimlarni taqdim etamiz.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: '#fff', color: '#0e7490' }}
                  className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Tezkor Linklar */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Our Team', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-100/70 hover:text-white hover:translate-x-2 transition-all inline-flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Xizmatlarimiz */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Cardiology', 'Dental Care', 'Neurology', 'Pediatrics', 'Diagnostics'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-blue-100/70 hover:text-white transition-all">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Kontaktlar */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-blue-200" />
                </div>
                <p className="text-blue-100/70 text-sm">Toshkent sh., Amir Temur ko'chasi, 108-uy</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-blue-200" />
                </div>
                <p className="text-blue-100/70 text-sm">+998 71 123 45 67</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-blue-200" />
                </div>
                <p className="text-blue-100/70 text-sm">info@medixweb.uz</p>
              </div>
            </div>
          </div>

        </div>

        {/* Pastki qatlam */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-blue-100/50">
          <p>© {currentYear} MedixWeb Healthcare. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;