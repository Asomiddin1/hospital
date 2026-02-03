import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import HospitalBuilding from '../../assets/hospital-building.png';

const Contact = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[35vh] md:h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HospitalBuilding} alt="Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Contact <span className="text-blue-300">Us</span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base font-light">
              Biz bilan bog'laning. Mutaxassislarimiz sizga yordam berishga va savollaringizga javob berishga tayyor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Aloqa ma'lumotlari kartochkalari */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: Phone, title: "Telefon", detail: "+998 71 200 00 00", sub: "Dush-Shan, 8:00 - 20:00" },
                { icon: Mail, title: "Email", detail: "info@medixweb.uz", sub: "Istalgan vaqtda yozing" },
                { icon: MapPin, title: "Manzil", detail: "Toshkent sh., Chilonzor 10-kvartal", sub: "Mo'ljal: Akfa Medline yonida" },
                { icon: Clock, title: "Ish tartibi", detail: "24/7 Shoshilinch yordam", sub: "Statsionar bo'lim doim ochiq" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200 flex items-start gap-5 group hover:border-[#0e7490]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0e7490]/5 flex items-center justify-center text-[#0e7490] group-hover:bg-[#0e7490] group-hover:text-white transition-all">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-slate-800 font-bold">{item.detail}</p>
                    <p className="text-slate-500 text-xs mt-1">{item.sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Ijtimoiy tarmoqlar */}
              <div className="flex gap-4 pt-4">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e7490] hover:border-[#0e7490] cursor-pointer transition-all">
                    <Icon size={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Xabar yuborish formasi */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm"
              >
                <h3 className="text-2xl font-black text-slate-800 mb-8">Xabar qoldiring</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-2">Ismingiz</label>
                      <input type="text" placeholder="Ismingizni kiriting" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#0e7490] focus:bg-white outline-none transition-all text-slate-800 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-2">Telefon raqamingiz</label>
                      <input type="text" placeholder="+998 90 123 45 67" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#0e7490] focus:bg-white outline-none transition-all text-slate-800 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-2">Mavzu</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#0e7490] focus:bg-white outline-none transition-all text-slate-800 text-sm appearance-none">
                      <option>Umumiy savol</option>
                      <option>Shifokor ko'rigiga yozilish</option>
                      <option>Laboratoriya natijalari</option>
                      <option>Shikoyat va takliflar</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-2">Xabar matni</label>
                    <textarea rows="4" placeholder="Xabaringizni shu yerga yozing..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#0e7490] focus:bg-white outline-none transition-all text-slate-800 text-sm resize-none"></textarea>
                  </div>
                  <button className="w-full bg-[#0e7490] text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[#0c647d] transition-all shadow-lg shadow-blue-900/10">
                    Xabarni yuborish <Send size={18} />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="w-full h-[450px] bg-slate-200 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.072884481352!2d69.20123761184334!3d41.28551410214697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a32609930f9%3A0xc48624a0d9c490a!2sAkfa%20Medline!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;