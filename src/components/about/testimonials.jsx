import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { id: 1, name: "Jorjina Bennett", role: "Business Consultant", comment: "MedixWeb jamoasi ko'rsatgan xizmatdan juda mamnunman. Texnologiyalar darajasi hayratlanarli!", rating: 5, image: "https://i.pravatar.cc/150?u=4"  },
  { id: 2, name: "Tom Rodriguez", role: "Graphic Designer", comment: "Kardialogiya bo'limi professionallari va onlayn bron tizimi juda qulay. Vaqtimni tejadim.", rating: 5, image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Michael Chen", role: "Software Engineer", comment: "Innovatsion yondashuv! MedixWeb nafaqat davolaydi, balki uzoq muddatli salomatlik beradi.", rating: 5, image: "https://i.pravatar.cc/150?u=1"  },
  { id: 4, name: "Sophia Turner", role: "Marketing Director", comment: "Shifokorlarning e'tibori va zamonaviy klinika muhiti menga juda yoqdi. Eng yaxshi tanlov!", rating: 5, image: "https://i.pravatar.cc/150?u=3"},
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 mb-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e7490]/5 text-[#0e7490] text-xs font-bold uppercase tracking-widest"
          >
            <div className="w-2 h-2 bg-[#0e7490] rounded-full animate-pulse"></div>
            Testimonials
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            What Our <span className="text-[#0e7490]">Patients</span> Say
          </h2>
        </div>
      </div>

      {/* INFINITE CAROUSEL QISMI */}
      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex gap-8 py-10"
          animate={{
            x: [0, -1600], // Kartochkalar kengligiga qarab moslang
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Tezlikni shu yerdan boshqaring
              ease: "linear",
            },
          }}
          whileHover={{ pause: true }} // Ustiga borganda to'xtaydi
        >
          {/* Kartochkalarni ikki marta chiqaramiz (cheksiz aylanish uchun) */}
          {[...reviews, ...reviews].map((review, index) => (
            <div 
              key={index}
              className="w-[350px] md:w-[450px] shrink-0 p-8 md:p-10 rounded-[2.5rem] bg-[#0e7490] text-white shadow-2xl relative group hover:-translate-y-2 transition-transform duration-500"
            >
              <Quote className="absolute top-8 right-8 text-white/10 w-20 h-20" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fff" color="#fff" />
                  ))}
                </div>

                <p className="text-lg md:text-xl font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
                  />
                  <div>
                    <h4 className="text-lg font-bold">{review.name}</h4>
                    <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Yon tomonlardagi gradient (yumshoq ko'rinish uchun) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Testimonials;