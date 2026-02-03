import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, Search, Edit, Trash2, Shield, 
  Stethoscope, User, LogOut, X, Save, 
  LayoutDashboard, Settings, Bell, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OperatorDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', role: 'patient', phone: '', specialization: '', password: ''
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'operator') {
      navigate('/auth/login');
      return;
    }
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/operator/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      if (error.response?.status === 401) navigate('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("O'chirilsinmi?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/operator/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) { alert("Xatolik!"); }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name, email: user.email, role: user.role,
      phone: user.phone || '', specialization: user.specialization || '', password: ''
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/operator/users/${editingUser.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchUsers();
    } catch (error) { alert("Xatolik!"); }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#0e7490]">Yuklanmoqda...</div>;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* --- FIXED SIDEBAR --- */}
      <aside className="w-72 bg-[#0f172a] text-white fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-cyan-500 rounded-lg shadow-lg shadow-cyan-500/30">
              <Shield size={24} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">MedAdmin</span>
          </div>

          <nav className="space-y-3">
            {[
              { name: 'Asosiy panel', icon: LayoutDashboard, active: true },
              { name: 'Foydalanuvchilar', icon: Users, active: false },
              { name: 'Shifokorlar', icon: Stethoscope, active: false },
              { name: 'Sozlamalar', icon: Settings, active: false },
            ].map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  item.active ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4 font-bold text-sm">
                  <item.icon size={20} /> {item.name}
                </div>
                {item.active && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-800">
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="w-full flex items-center gap-4 text-red-400 font-bold hover:text-red-300 transition-colors"
          >
            <LogOut size={20} /> Chiqish
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* ml-72 qo'shildi - sidebar kengligicha joy tashlaydi */}
      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
          <h2 className="text-xl font-black text-slate-800">Foydalanuvchilarni boshqarish</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Qidirish..." 
                 className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-cyan-500/20 outline-none text-sm w-64"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><Bell size={20} /></button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jami a'zolar</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{users.length}</h3>
            </div>
            <div className="bg-cyan-600 p-6 rounded-3xl shadow-xl shadow-cyan-600/20 text-white">
              <p className="text-xs font-bold text-cyan-100 uppercase tracking-widest">Shifokorlar</p>
              <h3 className="text-4xl font-black mt-2">{users.filter(u => u.role === 'doctor').length}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bemorlar</p>
              <h3 className="text-4xl font-black text-slate-800 mt-2">{users.filter(u => u.role === 'patient').length}</h3>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                   <tr>
                     <th className="px-8 py-5">Foydalanuvchi</th>
                     <th className="px-8 py-5">Roli</th>
                     <th className="px-8 py-5">Telefon</th>
                     <th className="px-8 py-5 text-right">Amallar</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {filteredUsers.map((u) => (
                     <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black">
                             {u.name.charAt(0)}
                           </div>
                           <div>
                             <p className="font-bold text-slate-800 text-sm">{u.name}</p>
                             <p className="text-xs text-slate-400">{u.email}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-8 py-5">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                           u.role === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                         }`}>
                           {u.role}
                         </span>
                       </td>
                       <td className="px-8 py-5 text-sm font-medium text-slate-600">{u.phone || '-'}</td>
                       <td className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                           <button onClick={() => openEditModal(u)} className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"><Edit size={18} /></button>
                           <button onClick={() => handleDelete(u.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </main>

      {/* --- TAHRIRLASH MODALI (O'zgarishsiz qoldi) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X size={24} /></button>
              <h2 className="text-2xl font-black text-slate-800 mb-6">Tahrirlash</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input className="w-full p-4 bg-slate-50 border-none rounded-xl" placeholder="Ism" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="w-full p-4 bg-slate-50 border-none rounded-xl" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <select className="w-full p-4 bg-slate-50 border-none rounded-xl" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="patient">Bemor</option>
                  <option value="doctor">Shifokor</option>
                  <option value="operator">Operator</option>
                </select>
                <button type="submit" className="w-full py-4 bg-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/20">Saqlash</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperatorDashboard;