import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Stethoscope, User, Phone, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios'; // <--- 1. AXIOS IMPORT QILINDI

const Register = () => {
  const navigate = useNavigate();
  
  // State-lar
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validatsiya
    if (formData.password !== formData.confirmPassword) {
      setError('Parollar bir-biriga mos kelmadi');
      setIsLoading(false);
      return;
    }

    try {
      // 2. HAQIQIY BACKENDGA MA'LUMOT TAYYORLASH
      const payload = {
        name: formData.fullName, // Backend 'name' so'raydi
        email: formData.email,
        phone: formData.phone,   // Biz qo'shgan 'phone' ustuni
        password: formData.password,
        role: 'patient'          // Avtomatik 'bemor' bo'lib ochiladi
      };

      // 3. API GA YUBORISH
      await axios.post('http://127.0.0.1:8000/api/register', payload);

      // Muvaffaqiyatli bo'lsa:
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi kirishingiz mumkin.");
      navigate('/auth/login'); 

    } catch (err) {
      console.error(err);
      // Xatolikni ko'rsatish
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi. Internetni yoki ma'lumotlarni tekshiring.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] py-12 px-4 relative overflow-hidden">
      
      {/* Orqa fon bezaklari */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-[#0e7490]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-cyan-400/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[500px] w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 p-8 md:p-10 border border-white z-10"
      >
        {/* Sarlavha */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#0e7490] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#0e7490]/30 rotate-3">
            <Stethoscope size={28} className="text-white -rotate-3" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">MedixWeb</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Yangi hisob yaratish</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleRegister}>
          
          {/* To'liq ism */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1 uppercase">To'liq ism va familiya</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0e7490]">
                <User size={18} />
              </div>
              <input 
                name="fullName"
                type="text" 
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0e7490] transition-all"
                placeholder="Ali Valiyev"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1 uppercase">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0e7490] transition-all"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Telefon */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1 uppercase">Telefon</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Phone size={18} />
              </div>
              <input 
                name="phone"
                type="tel" 
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0e7490] transition-all"
                placeholder="+998 90..."
              />
            </div>
          </div>

          {/* Parol */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1 uppercase">Parol</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0e7490] transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Parolni tasdiqlash */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1 uppercase">Tasdiqlash</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0e7490] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Ro'yxatdan o'tish tugmasi */}
          <div className="md:col-span-2 mt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0e7490] hover:bg-[#0a637a] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#0e7490]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Ro'yxatdan o'tish
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-50 pt-6">
          <p className="text-slate-500 text-sm font-medium">
            Hisobingiz bormi?{' '}
            <Link to="/auth/login" className="text-[#0e7490] font-bold hover:underline underline-offset-4">
              Kirish
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;