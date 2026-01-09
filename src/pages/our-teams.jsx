import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Building2, HeartPulse, Instagram, Linkedin, Twitter } from 'lucide-react';
import DoctorHouse from '../assets/doctorhouse.png';
import HospitalBuilding from '../assets/hospital-building.png';

const stats = [
  { label: 'Expert Doctors', value: '50+', icon: Users },
  { label: 'Success Operations', value: '15k+', icon: HeartPulse },
  { label: 'Hospital Rooms', value: '120+', icon: Building2 },
  { label: 'Global Awards', value: '12', icon: Award },
];

// Shifokorlar sonini 8 taga yetkazdik
const allDoctors = [
  { id: 1, name: 'Dr. Fiona Wood', role: 'Cardiology', image: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-with-stethoscope-around-neck-standing-with-folded-arms-isolated-on-white-wall_231208-13000.jpg', color: '#0e7490' },
  { id: 2, name: 'Dr. Gregory House', role: 'Diagnostic', image: DoctorHouse, color: '#2563eb' },
  { id: 3, name: 'Dr. James Wilson', role: 'Pediatrics', image: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-smiling-at-camera_1154-441.jpg', color: '#7c3aed' },
  { id: 4, name: 'Dr. Charlie Teo', role: 'Neurology', image: 'https://img.freepik.com/free-photo/smiling-asian-male-doctor-pointing-upwards_1262-18321.jpg', color: '#db2777' },
  { id: 5, name: 'Dr. Sarah Jenkins', role: 'Dentist', image: 'https://img.freepik.com/free-photo/portrait-smiling-female-doctor_107420-64810.jpg', color: '#0e7490' },
  { id: 6, name: 'Dr. Robert Chase', role: 'Surgeon', image: 'https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg', color: '#2563eb' },
  { id: 7, name: 'Dr. Allison Cameron', role: 'Immunology', image: 'https://img.freepik.com/free-photo/young-woman-doctor-white-coat-with-stethoscope-smiling-confident_140725-13931.jpg', color: '#7c3aed' },
  { id: 8, name: 'Dr. Eric Foreman', role: 'Neurologist', image: 'https://img.freepik.com/free-photo/male-doctor-with-stethoscope-standing-hospital_107420-64825.jpg', color: '#db2777' },
];

const OurTeams = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HospitalBuilding} alt="Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0e7490]/90"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black mb-4">
            Our Elite <span className="text-blue-300">Medical Team</span>
          </motion.h1>
          <p className="text-blue-50/80 max-w-xl mx-auto text-sm md:text-base">Sizning sog'lig'ingiz uchun mas'ul bo'lgan dunyo darajasidagi mutaxassislarimiz bilan tanishing.</p>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative -mt-12 z-20 container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-md p-5 rounded-[1.5rem] shadow-lg border border-white/50 text-center">
              <div className="text-[#0e7490] flex justify-center mb-2"><stat.icon size={20} /></div>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DOCTORS GRID */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Our Specialists</h2>
            <div className="w-16 h-1 bg-[#0e7490] mx-auto rounded-full"></div>
          </div>

          {/* Rasmlar kichikroq bo'lishi uchun grid va height sozlandi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative rounded-[2rem] overflow-hidden bg-slate-50 shadow-md transition-all duration-500 group-hover:-translate-y-2">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-[320px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
                  />
                  
                  {/* Social Icons Overlay */}
                  <div className="absolute inset-0 bg-[#0e7490]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <button key={i} className="p-2 bg-white rounded-full text-[#0e7490] hover:scale-110 transition-transform">
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* Role Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/50">
                      <h3 className="text-base font-bold text-slate-900 truncate">{doctor.name}</h3>
                      <p className="text-[#0e7490] text-[10px] font-extrabold uppercase tracking-wider">{doctor.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeams;