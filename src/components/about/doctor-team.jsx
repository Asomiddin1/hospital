import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import  DoctorHouse from '../../assets/doctorhouse.png';

const doctors = [
  {
    name: 'Dr. Fiona Wood',
    role: 'Cardiology Specialist',
    image: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-with-stethoscope-around-neck-standing-with-folded-arms-isolated-on-white-wall_231208-13000.jpg',
    color: '#0e7490'
  },
  {
    name: 'Dr. Gregory House',
    role: 'Diagnostic Medicine specialist',
    image: DoctorHouse,
    color: '#2563eb'
  },
  {
    name: 'Dr. James Wilson',
    role: 'Senior Pediatrician',
    image: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-smiling-at-camera_1154-441.jpg',
    color: '#7c3aed'
  },
  {
    name: 'Dr. Charlie Teo',
    role: 'Neurosurgeon',
    image: 'https://img.freepik.com/free-photo/smiling-asian-male-doctor-pointing-upwards_1262-18321.jpg',
    color: '#db2777'
  },
];

const DoctorTeam = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header - Minimalist & Modern */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-[2px] w-12 bg-[#0e7490]"></span>
              <span className="text-[#0e7490] font-bold text-sm uppercase tracking-[0.3em]">Specialists</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
            >
              The Minds Behind <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0e7490] to-blue-600 text-6xl italic ">Your Health.</span>
            </motion.h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 shadow-sm flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            View Full Directory <ArrowUpRight size={20} />
          </motion.button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              {/* Image Container with Floating Effect */}
              <div className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-[450px] object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Social Icons Overlay (Hoverda chiqadi) */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                  {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.2, backgroundColor: '#fff', color: '#000' }}
                      className="p-3 bg-white/20 rounded-full text-white border border-white/30"
                    >
                      <Icon size={20} />
                    </motion.button>
                  ))}
                </div>

                {/* Role Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-lg">
                    {doctor.role}
                  </span>
                </div>
              </div>

              {/* Name and Content */}
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-[#0e7490] transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Available Now</span>
                </div>
              </div>

              {/* Decorative Background Element (Hoverda kattalashadi) */}
              <div 
                className="absolute -z-10 top-20 left-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"
                style={{ backgroundColor: doctor.color }}
              ></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorTeam;