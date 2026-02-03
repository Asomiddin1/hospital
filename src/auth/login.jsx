import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Stethoscope, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { token, role, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_name', user.name);

      if (role === 'doctor') navigate('/doctor-dashboard');
      else if (role === 'operator') navigate('/operator-dashboard');
      else if (role === 'patient') navigate('/');
      else navigate('/');

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server bilan bog'lanishda xatolik yuz berdi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0e7490]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-[420px] w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 p-8 md:p-10 border border-white z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#0e7490] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#0e7490]/30 rotate-3">
            <Stethoscope size={28} className="text-white -rotate-3" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">MedixWeb</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Tizimga kirish</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium">
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Manzil</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0e7490] transition-colors">
                <Mail size={18} />
              </div>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0e7490]/5 focus:border-[#0e7490] transition-all text-slate-700 placeholder:text-slate-400" placeholder="email@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Parol</label>
              <Link to="/forgot-password" size={16} className="text-[12px] font-bold text-[#0e7490] hover:text-[#085a70]">Unutdingizmi?</Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0e7490] transition-colors">
                <Lock size={18} />
              </div>
              <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0e7490]/5 focus:border-[#0e7490] transition-all text-slate-700 placeholder:text-slate-400" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0e7490] transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full bg-[#0e7490] hover:bg-[#0a637a] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#0e7490]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-8 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Tizimga kirish <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-50 pt-6">
          <p className="text-slate-500 text-sm font-medium">Hisobingiz yo'qmi? <Link to="/auth/register" className="text-[#0e7490] font-bold hover:underline underline-offset-4">Ro'yxatdan o'ting</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;