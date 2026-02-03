import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Calendar, FileText, Clock, Stethoscope, LogOut, 
  Pill, Activity, Home, Plus, X, LayoutDashboard, Menu, 
  CheckCircle, ChevronRight
} from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_time: ''
  });

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const userRes = await axios.get('http://127.0.0.1:8000/api/user', config);
      setUser(userRes.data);

      const appRes = await axios.get('http://127.0.0.1:8000/api/patient/appointments', config);
      setAppointments(appRes.data);

      const histRes = await axios.get('http://127.0.0.1:8000/api/patient/history', config);
      setHistory(histRes.data);

      const docsRes = await axios.get('http://127.0.0.1:8000/api/patient/doctors', config);
      setDoctors(docsRes.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/auth/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/patient/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Qabulga muvaffaqiyatli yozildingiz!");
      setShowModal(false);
      setFormData({ doctor_id: '', appointment_time: '' });
      fetchData();
      
    } catch (error) {
      alert("Xatolik! Vaqtni to'g'ri tanlang.");
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-[#0e7490]">Yuklanmoqda...</div>;

  const menuItems = [
    { id: 'dashboard', label: 'Asosiy Oyna', icon: LayoutDashboard },
    { id: 'appointments', label: 'Qabullarim', icon: Calendar },
    { id: 'history', label: 'Kasallik Tarixi', icon: FileText },
  ];

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700 border border-green-200'; // Yashil
      case 'completed': return 'bg-blue-100 text-blue-700 border border-blue-200'; // Moviy
      case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200'; // Sariq
      case 'canceled': return 'bg-red-100 text-red-700 border border-red-200'; // Qizil
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Tasdiqlangan';
      case 'completed': return 'Yakunlangan';
      case 'pending': return 'Kutilmoqda';
      case 'canceled': return 'Bekor qilingan';
      default: return status;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#0e7490]">
            <div className="w-10 h-10 bg-[#0e7490] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0e7490]/20">
              <User size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">MEDIX Patient</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${activeTab === item.id ? 'bg-[#0e7490]/10 text-[#0e7490]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
             <Home size={20} /> Bosh Sahifaga
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
               <User size={20} />
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
               <p className="text-xs text-slate-500 truncate">{user?.email}</p>
             </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between lg:hidden border-b border-slate-200">
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-800">Bemor Kabineti</span>
          <div className="w-8" />
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">
                {activeTab === 'dashboard' ? 'Xush kelibsiz 👋' : activeTab === 'appointments' ? 'Mening Qabullarim' : 'Kasallik Tarixi'}
              </h1>
              <p className="text-slate-500 text-sm mt-1">Salomatligingiz — bizning oliy maqsadimiz</p>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-[#0e7490] hover:bg-[#08627a] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#0e7490]/20 flex items-center gap-2 transition-all active:scale-95">
              <Plus size={20} /> Qabulga yozilish
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#0e7490] to-[#0891b2] text-white p-6 rounded-[24px] shadow-lg shadow-[#0e7490]/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-cyan-100 font-medium mb-1">Faol qabullar</p>
                    <h3 className="text-4xl font-black">{appointments.filter(a => a.status === 'pending' || a.status === 'approved').length}</h3>
                  </div>
                  <Calendar className="absolute right-[-10px] bottom-[-10px] text-white/10 w-32 h-32" />
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                    <Activity size={28} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tashriflar soni</p>
                    <h3 className="text-2xl font-black text-slate-800">{history.length}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Holat</p>
                    <h3 className="text-2xl font-black text-slate-800">Faol</h3>
                  </div>
                </div>
              </div>

              {appointments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-800 mb-4">Eng yaqin qabul</h2>
                  <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#0e7490]/10 text-[#0e7490] rounded-2xl flex items-center justify-center">
                        <Clock size={28} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{appointments[0].doctor?.name}</h3>
                        <p className="text-slate-500">{new Date(appointments[0].appointment_time).toLocaleString('uz-UZ')}</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('appointments')} className="text-[#0e7490] font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Barchasini ko'rish <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {(activeTab === 'appointments' || activeTab === 'dashboard') && activeTab !== 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {appointments.length > 0 ? (
                appointments.map((item) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={item.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0e7490]/20 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-[#0e7490] group-hover:bg-[#0e7490] group-hover:text-white transition-colors">
                          <Stethoscope size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{item.doctor?.name}</h3>
                          <p className="text-xs text-slate-400">{item.doctor?.specialization}</p>
                        </div>
                      </div>
                      
                      {/* STATUS QISMI O'ZGARTIRILDI */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>

                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2 text-sm text-slate-600 font-medium">
                       <Clock size={16} className="text-[#0e7490]" />
                       {new Date(item.appointment_time).toLocaleString('uz-UZ')}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                  Hozircha qabullar yo'q
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {history.length > 0 ? (
                history.map((item) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={item.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 border-l-4 border-l-[#0e7490]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Tashxis: {item.diagnosis}</h3>
                        <p className="text-slate-500 text-sm mt-1">Shifokor: <span className="font-semibold text-slate-700">{item.doctor?.name}</span></p>
                      </div>
                      <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold">
                        {new Date(item.visit_date).toLocaleDateString()}
                      </span>
                    </div>
                    {item.prescription && (
                      <div className="bg-slate-50 p-4 rounded-xl mt-4 border border-slate-100">
                        <div className="flex items-center gap-2 text-[#0e7490] font-bold text-sm mb-2">
                          <Pill size={16} /> Retsept / Tavsiya:
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.prescription}</p>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                  Kasallik tarixi topilmadi
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-[32px] shadow-2xl w-full max-w-md p-8 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Qabulga yozilish</h2>
              <p className="text-slate-500 mb-6">Shifokor va vaqtni tanlang</p>
              <form onSubmit={handleBookAppointment} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Shifokor</label>
                  <select required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0e7490]/20 font-medium text-slate-700" value={formData.doctor_id} onChange={(e) => setFormData({...formData, doctor_id: e.target.value})}>
                    <option value="">Tanlang...</option>
                    {doctors.map(doc => (<option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sana va Vaqt</label>
                  <input type="datetime-local" required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0e7490]/20 font-medium text-slate-700" value={formData.appointment_time} onChange={(e) => setFormData({...formData, appointment_time: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-4 bg-[#0e7490] text-white font-bold rounded-xl shadow-lg shadow-[#0e7490]/20 hover:bg-[#08627a] active:scale-[0.98] transition-all">Tasdiqlash</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;