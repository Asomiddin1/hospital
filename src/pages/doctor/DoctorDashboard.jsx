import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Calendar, Clock, Stethoscope, LogOut, 
  Activity, CheckCircle, Clipboard, X, Menu, 
  LayoutDashboard, Users, Settings, Bell, Check, XCircle, FileText, Phone, Pill
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]); // <--- Bemorlar tarixi uchun state
  const [loading, setLoading] = useState(true);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); 

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [treatmentData, setTreatmentData] = useState({
    diagnosis: '',
    prescription: ''
  });

  // --- MA'LUMOT OLISH ---
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'doctor') {
      navigate('/auth/login');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // 1. User
      const userRes = await axios.get('http://127.0.0.1:8000/api/user', config);
      setUser(userRes.data);

      // 2. Appointments (Pending, Approved)
      const appRes = await axios.get('http://127.0.0.1:8000/api/doctor/appointments', config);
      setAppointments(appRes.data);

      // 3. History (Tashxislar va Retseptlar) - YANGI API
      const histRes = await axios.get('http://127.0.0.1:8000/api/doctor/history', config);
      setHistory(histRes.data);

    } catch (error) {
      console.error("Fetch error:", error);
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

  // --- ACTIONS ---
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/doctor/accept/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Bemor qabul qilindi!");
      fetchData();
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  const handleCancel = async (id) => {
    if(!window.confirm("Rostdan ham bekor qilmoqchimisiz?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/doctor/cancel/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  const handleTreatPatient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/doctor/treat/${selectedAppointment.id}`, treatmentData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Bemor davolandi va tarixga qo'shildi!");
      setSelectedAppointment(null);
      setTreatmentData({ diagnosis: '', prescription: '' });
      fetchData();
    } catch (error) {
      alert("Xatolik yuz berdi.");
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-[#0e7490]">Yuklanmoqda...</div>;

  // --- FILTRLAR ---
  const pendingRequests = appointments.filter(app => app.status === 'pending');
  const activeQueue = appointments.filter(app => app.status === 'approved');

  const menuItems = [
    { id: 'dashboard', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
    { id: 'history', label: 'Davolash Tarixi', icon: FileText }, 
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#0e7490]">
            <div className="w-10 h-10 bg-[#0e7490] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0e7490]/20">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">MEDIX</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400"><X size={24} /></button>
        </div>
        <nav className="p-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${activeTab === item.id ? 'bg-[#0e7490]/10 text-[#0e7490]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500"><User size={20} /></div>
            <div className="overflow-hidden"><p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p><p className="text-xs text-slate-500 truncate">{user?.role}</p></div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"><LogOut size={16} /> Chiqish</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between lg:hidden border-b border-slate-200">
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600"><Menu size={24} /></button>
          <span className="font-bold text-slate-800">Shifokor Paneli</span>
          <div className="w-8" />
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">
                {activeTab === 'dashboard' ? 'Boshqaruv Paneli' : activeTab === 'history' ? 'Davolash Tarixi' : 'Sozlamalar'}
              </h1>
              <p className="text-slate-500 text-sm mt-1">Bugungi sana: {new Date().toLocaleDateString('uz-UZ')}</p>
            </div>
          </div>

          {/* --- 1. DASHBOARD --- */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#0e7490] to-[#0891b2] text-white p-6 rounded-[24px] shadow-lg shadow-[#0e7490]/20 relative overflow-hidden">
                  <div className="relative z-10"><p className="text-cyan-100 font-medium mb-1">Yangi So'rovlar</p><h3 className="text-4xl font-black">{pendingRequests.length}</h3></div>
                  <Activity className="absolute right-[-10px] bottom-[-10px] text-white/10 w-32 h-32" />
                </div>
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><CheckCircle size={28} /></div>
                  <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Jami Davolandi</p><h3 className="text-2xl font-black text-slate-800">{history.length}</h3></div>
                </div>
              </div>

              {/* Yangi So'rovlar */}
              <div className="mb-10">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Bell className="text-yellow-500" size={20} /> Yangi kelgan so'rovlar <span className="text-sm font-normal text-slate-400">({pendingRequests.length})</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pendingRequests.length > 0 ? pendingRequests.map((app) => (
                    <div key={app.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center font-bold text-lg">{app.patient?.name.charAt(0)}</div>
                            <div><h3 className="font-bold text-slate-800">{app.patient?.name}</h3><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><Clock size={12} />{new Date(app.appointment_time).toLocaleString('uz-UZ')}</div></div>
                          </div>
                       </div>
                       <div className="flex gap-2 mt-4">
                          <button onClick={() => handleCancel(app.id)} className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors flex items-center justify-center gap-1"><XCircle size={18} /> Rad etish</button>
                          <button onClick={() => handleAccept(app.id)} className="flex-1 py-2.5 bg-[#0e7490] text-white rounded-xl font-bold hover:bg-[#08627a] transition-colors flex items-center justify-center gap-1"><Check size={18} /> Qabul qilish</button>
                       </div>
                    </div>
                  )) : <div className="col-span-full py-8 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">Yangi so'rovlar mavjud emas</div>}
                </div>
              </div>

              {/* Faol Navbat */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Stethoscope className="text-[#0e7490]" size={20} /> Faol Navbat (Davolash)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeQueue.length > 0 ? activeQueue.map((app) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={app.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0e7490]/20 transition-all duration-300 group cursor-pointer border-l-4 border-l-[#0e7490]">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#0e7490]/10 text-[#0e7490] rounded-2xl flex items-center justify-center font-bold text-lg">{app.patient?.name.charAt(0)}</div>
                          <div><h3 className="font-bold text-slate-800">{app.patient?.name}</h3><span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">Tasdiqlangan</span></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 mb-4 flex items-center gap-2 text-xs text-slate-600 font-medium"><Clock size={14} className="text-[#0e7490]" />{new Date(app.appointment_time).toLocaleString('uz-UZ')}</div>
                      <button onClick={() => setSelectedAppointment(app)} className="w-full py-3 bg-slate-900 text-white text-sm rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-[#0e7490] transition-colors">Davolash (Yakunlash) <Stethoscope size={16} /></button>
                    </motion.div>
                  )) : <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">Navbatda hech kim yo'q</div>}
                </div>
              </div>
            </>
          )}

          {/* --- 2. HISTORY TAB --- */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">Davolash Tarixi</h2>
                <p className="text-slate-500 text-sm">Siz tomoningizdan davolangan barcha bemorlar</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Bemor</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tashxis</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Retsept</th>
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Sana</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? history.map((record) => (
                      <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white">
                              {record.patient?.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{record.patient?.name}</p>
                              {record.patient?.phone && (
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Phone size={12} /> {record.patient.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="max-w-[200px] truncate font-medium text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                             {record.diagnosis}
                          </div>
                        </td>
                        <td className="p-6 hidden md:table-cell">
                          <div className="max-w-[200px] text-xs text-slate-500 line-clamp-2">
                             {record.prescription || '-'}
                          </div>
                        </td>
                        <td className="p-6 hidden md:table-cell text-sm text-slate-500 font-medium">
                          {new Date(record.visit_date).toLocaleDateString('uz-UZ')}
                        </td>
                      </tr>
                    )) : <tr><td colSpan="4" className="p-10 text-center text-slate-400">Hozircha tarix bo'sh</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl p-8 relative">
              <button onClick={() => setSelectedAppointment(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Tashxis qo'yish</h2>
              <p className="text-slate-500 mb-6">Bemor: <span className="font-bold text-slate-900">{selectedAppointment.patient?.name}</span></p>
              <form onSubmit={handleTreatPatient} className="space-y-5">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tashxis</label><textarea required rows="3" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0e7490]/20 resize-none font-medium" placeholder="Tashxisni kiriting..." value={treatmentData.diagnosis} onChange={(e) => setTreatmentData({...treatmentData, diagnosis: e.target.value})} /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Retsept</label><textarea rows="4" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0e7490]/20 resize-none font-medium" placeholder="Dori va tavsiyalar..." value={treatmentData.prescription} onChange={(e) => setTreatmentData({...treatmentData, prescription: e.target.value})} /></div>
                <button type="submit" className="w-full py-4 bg-[#0e7490] text-white font-bold rounded-xl shadow-lg shadow-[#0e7490]/20 hover:bg-[#08627a] active:scale-[0.98] transition-all">Yakunlash va Saqlash</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDashboard;