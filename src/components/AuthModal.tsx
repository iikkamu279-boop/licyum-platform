'use client';

import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  BookOpen,
  FileText,
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'penulis' | 'reviewer' | 'peserta'>('penulis');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institution: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0F2850] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-amber-400 font-extrabold tracking-wider text-xs uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Licyum Single Sign-On (SSO)</span>
          </div>

          <h3 className="text-xl font-black">
            {mode === 'login' ? 'Masuk ke Akun Licyum' : 'Registrasi Akun Akademisi'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Satu akun untuk Penerbitan Buku, Portal Jurnal OJS, dan Pelatihan Resmi.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#0F2850] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-[#0F2850] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {mode === 'login' ? 'Login Berhasil!' : 'Akun Berhasil Dibuat!'}
              </h4>
              <p className="text-xs text-slate-500">
                Mengarahkan Anda ke dasbor ekosistem Licyum...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {mode === 'register' && (
                <>
                  {/* Role picker */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Peran Akademik Utama:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <button
                        type="button"
                        onClick={() => setRole('penulis')}
                        className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          role === 'penulis'
                            ? 'border-[#0F2850] bg-blue-50 text-[#0F2850]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Penulis Buku
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('reviewer')}
                        className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          role === 'reviewer'
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Author Jurnal
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('peserta')}
                        className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          role === 'peserta'
                            ? 'border-amber-600 bg-amber-50 text-amber-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Peserta Diklat
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap & Gelar Akademik
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Dr. Budi Prasetyo, M.Hum."
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2850]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Asal Perguruan Tinggi / Sekolah
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="Contoh: Universitas Gadjah Mada"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2850]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email (Institusi / Pribadi)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dosen@kampus.ac.id"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2850]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Kata Sandi (Password)
                  </label>
                  {mode === 'login' && (
                    <a
                      href="#lupa-password"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Tautan pemulihan kata sandi telah dikirim ke email Anda.');
                      }}
                      className="text-[11px] text-[#0F2850] hover:underline"
                    >
                      Lupa password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2850]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0F2850] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'}</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Dengan melanjutkan, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi Licyum Indonesia.
        </div>

      </div>
    </div>
  );
};
