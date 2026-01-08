import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import YouTube from 'react-youtube'; // Kutubxonani import qilamiz

const TotalCareModel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "cF-W_wTZ1iw"; 

  // Video sozlamalari
  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  // VIDEO TUGAGANDA ISHLAYDIGAN FUNKSIYA
  const onVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative w-full py-10 bg-white">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <div className="w-2 h-2 bg-[#0e7490] rotate-45"></div>
          <span className="text-[#0e7490] text-xs font-bold uppercase tracking-widest">Approach</span>
        </motion.div>

        <motion.h2 className="text-3xl md:text-5xl font-bold text-[#0e7490] mb-6">
          The MedixWeb Total Care™ Model
        </motion.h2>

        <motion.p className="max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed mb-12">
          Providing patient-centered care through expert guidance, innovative solutions, and 
          personalized support every step of the way.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl bg-black min-h-[300px] md:min-h-[550px]"
        >
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600" 
                  alt="Medical Team"
                  className="w-full h-[300px] md:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e7490]/90 via-transparent to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 text-white shadow-2xl group-hover:bg-white group-hover:text-[#0e7490] transition-all">
                    <Play fill="currentColor" size={32} className="ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left">
                  <p className="text-white text-lg md:text-2xl font-medium max-w-2xl">
                    Our MedixWeb™ model unites doctors, specialists, and wellness experts.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full min-h-[300px] md:min-h-[550px]"
              >
                {/* Video ustiga "Yopish" tugmasini ham qo'shib qo'yamiz (har ehtimolga qarshi) */}
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                  <X size={20} />
                </button>

                <YouTube 
                  videoId={videoId} 
                  opts={videoOptions} 
                  onEnd={onVideoEnd} // Video tugaganda ishga tushadi
                  className="w-full h-full absolute inset-0"
                  containerClassName="w-full h-full h-[300px] md:h-[550px]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default TotalCareModel;