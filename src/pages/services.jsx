import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, BrainCircuit, Stethoscope, Microscope, 
  Clock, ShieldCheck, ChevronRight, Phone, 
  Dna, Baby, Eye, Activity, FlaskConical, Syringe
} from 'lucide-react';
import HospitalBuilding from '../assets/hospital-building.png';

const mainServices = [
  { 
    title: "Cardiology", 
    desc: "Yurak tizimini diagnostika qilish va davolash.", 
    features: ["EKG", "ExoKG", "Holter monitoring"],
    icon: Heart 
  },
  { 
    title: "Neurology", 
    desc: "Nerv tizimi va miya faoliyatini chuqur o'rganish.", 
    features: ["EEG", "Neyrosonografiya", "Vertigo davolash"],
    icon: BrainCircuit 
  },
  { 
    title: "Pediatrics", 
    desc: "Bolalar salomatligi uchun barcha xizmatlar.", 
    features: ["Vaksina", "Fizioterapiya", "Logoped"],
    icon: Baby 
  },
  { 
    title: "Laboratory", 
    desc: "Aniq va tezkor tahlillar, zamonaviy uskunalar.", 
    features: ["Gematologiya", "Biokimyo", "Gormonlar"],
    icon: Microscope 
  },
  { 
    title: "Diagnostics", 
    desc: "Yuqori aniqlikdagi tekshiruv usullari.", 
    features: ["MRT/MSKT", "Rentgen", "UTT (UZI)"],
    icon: Activity 
  },
  { 
    title: "Ophthalmology", 
    desc: "Ko'z kasalliklarini davolash va tekshirish.", 
    features: ["Ko'z bosimi", "Linza tanlash", "Katarakta"],
    icon: Eye 
  },
  { 
    title: "Genetics", 
    desc: "Irsiy kasalliklarni aniqlash va tahlil qilish.", 
    features: ["DNK testi", "Skrining", "Genetik maslahat"],
    icon: Dna 
  },
  { 
    title: "Surgery", 
    desc: "Kichik va murakkab jarrohlik amaliyotlari.", 
    features: ["Laparoskopiya", "Lazer operatsiyasi", "Reabilitatsiya"],
    icon: FlaskConical 
  },
  { 
    title: "General Care", 
    desc: "Umumiy tibbiy ko'rik va maslahatlar.", 
    features: ["Terapevt", "Check-up", "Uyda ko'rik"],
    icon: Syringe 
  }
];

const Services = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[40vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HospitalBuilding} alt="Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              Medical <span className="text-blue-300">Excellence</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
              Bizning ko'p tarmoqli klinikamiz jahon standartlariga javob beradigan uskunalar va 20 yildan ortiq tajribaga ega mutaxassislar bilan jihozlangan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4">Xizmatlarimiz Yo'nalishlari</h2>
            <div className="w-20 h-1 bg-[#0e7490] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 text-[#0e7490] group-hover:bg-[#0e7490] group-hover:text-white transition-all duration-300">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Sub-services list */}
                <div className="space-y-2 mb-8 border-t border-slate-100 pt-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0e7490]/40"></div>
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-[#0e7490] uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform">
                  Batafsil ma'lumot <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORK PROCESS - Qo'shimcha ma'lumotlar bloki */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">Bizda davolanish qanday <span className="text-[#0e7490]">amalga oshiriladi?</span></h2>
              <p className="text-slate-500 leading-relaxed">Sizning qulayligingiz va tezkor sog'ayishingiz uchun biz soddalashtirilgan ish tartibini joriy qilganmiz.</p>
              
              <div className="space-y-8 mt-10">
                {[
                  { n: "01", t: "Onlayn ro'yxatdan o'tish", d: "Sayt yoki telefon orqali o'zingizga qulay vaqtni belgilang." },
                  { n: "02", t: "Mutaxassis ko'rigi", d: "Yuqori malakali shifokorlarimiz sizni batafsil tekshiruvdan o'tkazishadi." },
                  { n: "03", t: "Aniq tashxis va davolash", d: "Laboratoriya natijalari asosida shaxsiy davolash rejasi tuziladi." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-4xl font-black text-slate-100">{item.n}</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">{item.t}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-100 rounded-[3rem] w-full aspect-square relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest">Medical Image Space</div>
                <img src={HospitalBuilding} className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="Process" />
              </div>
              {/* Statistik blok */}
              <div className="absolute -bottom-10 -left-10 bg-[#0e7490] p-10 rounded-[2rem] text-white shadow-2xl hidden md:block">
                <h5 className="text-4xl font-black">25+</h5>
                <p className="text-xs text-blue-100 uppercase mt-2">Yillik Tajriba</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BAR */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="bg-[#0e7490] rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-black">Sog'lig'ingizni mutaxassislarga ishoning</h3>
              <p className="text-blue-100 font-light">Mutaxassislarimiz savollaringizga javob berishga har doim tayyor.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button className="bg-white text-[#0e7490] px-10 py-5 rounded-2xl font-black text-sm hover:scale-105 transition-transform flex items-center justify-center gap-3">
                <Phone size={18} /> +998 71 200 00 00
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;