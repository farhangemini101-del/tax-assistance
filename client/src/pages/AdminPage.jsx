import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  GraduationCap, 
  RefreshCw, 
  Mail, 
  Phone, 
  Download, 
  FileText, 
  Database, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  Search, 
  Filter, 
  Building2, 
  Plus, 
  BookOpen, 
  Server, 
  Activity, 
  ExternalLink,
  Edit3,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Globe,
  UserCheck,
  Sparkles,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  
  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showCredHelper, setShowCredHelper] = useState(false);

  // Data states
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Filters & Searches
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  
  const [applicantSearch, setApplicantSearch] = useState('');
  const [applicantStatusFilter, setApplicantStatusFilter] = useState('All');

  // New Client Form
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCategory, setNewClientCategory] = useState('Banking, Finance, Insurance & Securities');
  const [newClientPriority, setNewClientPriority] = useState('2nd');

  // New Resource Form
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResTitle, setNewResTitle] = useState('');
  const [newResCategory, setNewResCategory] = useState('Tax Updates');
  const [newResYear, setNewResYear] = useState('2026');
  const [newResFormat, setNewResFormat] = useState('PDF Document');
  const [newResDesc, setNewResDesc] = useState('');

  const getAuthToken = () => {
    return localStorage.getItem('ta_cms_token') || sessionStorage.getItem('ta_cms_token');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  // Check existing session token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        setAuthChecking(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.user);
          fetchAllData(token);
        } else {
          localStorage.removeItem('ta_cms_token');
          sessionStorage.removeItem('ta_cms_token');
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  const fetchAllData = async (overrideToken) => {
    const token = overrideToken || getAuthToken();
    if (!token) return;

    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [statsRes, inqRes, appRes, clientsRes, libRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/inquiries', { headers }),
        fetch('/api/career/applications', { headers }),
        fetch('/api/clients'),
        fetch('/api/library')
      ]);

      if (statsRes.status === 401 || inqRes.status === 401) {
        handleLogout();
        return;
      }

      const [statsData, inqData, appData, clientsData, libData] = await Promise.all([
        statsRes.json(),
        inqRes.json(),
        appRes.json(),
        clientsRes.json(),
        libRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (inqData.success) setInquiries(inqData.data);
      if (appData.success) setApplications(appData.data);
      if (clientsData.success) setClients(clientsData.data);
      if (libData.success) setResources(libData.data);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword
        })
      });

      const data = await res.json();
      if (data.success && data.token) {
        if (rememberMe) {
          localStorage.setItem('ta_cms_token', data.token);
          localStorage.setItem('ta_cms_user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('ta_cms_token', data.token);
          sessionStorage.setItem('ta_cms_user', JSON.stringify(data.user));
        }
        setIsAuthenticated(true);
        setAdminUser(data.user);
        showNotification('Authenticated successfully. Welcome to Tax Assistance CMS Console.');
        fetchAllData(data.token);
      } else {
        setLoginError(data.message || 'Invalid administrative credentials. Access denied.');
      }
    } catch (err) {
      setLoginError('Unable to connect to MySQL backend server. Please verify the system is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    const token = getAuthToken();
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {}
    }
    localStorage.removeItem('ta_cms_token');
    localStorage.removeItem('ta_cms_user');
    sessionStorage.removeItem('ta_cms_token');
    sessionStorage.removeItem('ta_cms_user');
    setIsAuthenticated(false);
    setAdminUser(null);
    setStats(null);
    setInquiries([]);
    setApplications([]);
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification(`Inquiry status updated to "${status}" in MySQL.`);
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry from MySQL?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification('Inquiry deleted from MySQL.');
        fetchAllData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Application actions
  const handleUpdateAppStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/career/applications/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification(`Candidate status updated to "${status}" in MySQL.`);
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Delete this applicant and CV record from MySQL?')) return;
    try {
      const res = await fetch(`/api/career/applications/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification('Applicant record deleted from MySQL.');
        fetchAllData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Add Client
  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: newClientName,
          category: newClientCategory,
          priority: newClientPriority
        })
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification(data.message);
        setNewClientName('');
        setShowAddClient(false);
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to add client: ' + err.message);
    }
  };

  // Delete Client
  const handleDeleteClient = async (id) => {
    if (!window.confirm(`Delete client "${id}" from MySQL?`)) return;
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification('Client removed from MySQL.');
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to delete client: ' + err.message);
    }
  };

  // Add Resource
  const handleAddResourceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/library', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: newResTitle,
          category: newResCategory,
          year: newResYear,
          format: newResFormat,
          description: newResDesc
        })
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification(data.message);
        setNewResTitle('');
        setNewResDesc('');
        setShowAddResource(false);
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to add publication: ' + err.message);
    }
  };

  // Delete Resource
  const handleDeleteResource = async (id) => {
    if (!window.confirm('Delete this publication from MySQL?')) return;
    try {
      const res = await fetch(`/api/library/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        showNotification('Publication deleted from MySQL.');
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Filtered queries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;
    const matchesSearch = inq.fullName?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          inq.organization?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          inq.email?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          inq.serviceRequired?.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredApplications = applications.filter(app => {
    const matchesStatus = applicantStatusFilter === 'All' || app.status === applicantStatusFilter;
    const matchesSearch = app.fullName?.toLowerCase().includes(applicantSearch.toLowerCase()) ||
                          app.email?.toLowerCase().includes(applicantSearch.toLowerCase()) ||
                          app.positionTitle?.toLowerCase().includes(applicantSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // CSV Exporters
  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return alert('No inquiries to export.');
    const headers = 'ID,Full Name,Organization,Email,Phone,Service Required,Status,Created At\n';
    const rows = inquiries.map(i => `"${i.id}","${i.fullName}","${i.organization || ''}","${i.email}","${i.phone}","${i.serviceRequired}","${i.status}","${i.createdAt}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tax_Assistance_Inquiries_${Date.now()}.csv`;
    a.click();
  };

  const exportApplicantsCSV = () => {
    if (applications.length === 0) return alert('No applications to export.');
    const headers = 'ID,Candidate Name,Email,Phone,Position,Status,Resume URL,Applied At\n';
    const rows = applications.map(a => `"${a.id}","${a.fullName}","${a.email}","${a.phone}","${a.positionTitle}","${a.status}","${a.resumeUrl}","${a.appliedAt}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tax_Assistance_Applicants_${Date.now()}.csv`;
    a.click();
  };

  // -------------------------------------------------------------
  // RENDER 1: AUTHENTICATION LOADING
  // -------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#040d1a] flex flex-col items-center justify-center text-white px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center p-2 shadow-xl animate-pulse">
            <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Verifying CMS Security Token & Session...</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 2: CMS LOGIN GATE (HIDDEN / RESTRICTED AREA)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030914] text-slate-200 flex flex-col justify-between relative overflow-hidden font-sans">
        {/* Subtle Background Lighting */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Minimal Header */}
        <header className="relative z-10 border-b border-slate-800/60 bg-[#050f1f]/80 backdrop-blur-md px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white p-1 shadow">
                <img src="/logo.webp" alt="Tax Assistance Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition">
                  Tax Assistance (TA)
                </h1>
                <p className="text-[10px] text-slate-400">RHA Advisory & Co. • Chartered Accountancy</p>
              </div>
            </Link>

            <Link
              to="/"
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </header>

        {/* Central CMS Login Card */}
        <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            
            <div className="rounded-3xl bg-[#081528] border border-slate-700/80 shadow-2xl p-8 backdrop-blur-xl relative">
              
              {/* Top Shield Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-blue-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  Restricted Staff Area
                </span>
                <h2 className="text-xl font-black text-white tracking-tight">Executive CMS Portal</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tax Assistance • Internal Management & Database Control
                </p>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{loginError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Administrator ID / Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="admin"
                      required
                      autoComplete="username"
                      className="w-full bg-[#050f1f] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Security Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full bg-[#050f1f] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[11px] text-slate-400">Remember workstation session</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071526] font-extrabold text-xs tracking-wider uppercase transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Sign In to CMS Console</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Credentials Info Box */}
              <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                <button
                  type="button"
                  onClick={() => setShowCredHelper(!showCredHelper)}
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 transition underline underline-offset-4"
                >
                  {showCredHelper ? 'Hide System Access Credentials' : '🔑 View System Access Credentials'}
                </button>

                {showCredHelper && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-[11px] space-y-1 animate-in fade-in">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Username:</span>
                      <span className="font-mono text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded">admin</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Password:</span>
                      <span className="font-mono text-amber-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">admin@ta2026</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginUsername('admin');
                        setLoginPassword('admin@ta2026');
                      }}
                      className="w-full mt-2 py-1 text-[10px] text-center bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded font-bold transition"
                    >
                      Autofill Default Credentials
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Security Note */}
            <p className="text-center text-[11px] text-slate-500 mt-6 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Secured by 256-bit SSL encryption & MySQL Session Tokens</span>
            </p>

          </div>
        </main>

        {/* Footer Minimal */}
        <footer className="relative z-10 border-t border-slate-800/60 py-4 px-6 text-center text-[10px] text-slate-500">
          Copyright © 2026 Tax Assistance (TA), RHA Advisory & Co. Internal Management Use Only.
        </footer>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 3: AUTHENTICATED CMS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-24">
      
      {/* Executive Dedicated CMS Top Bar */}
      <header className="bg-[#071526] border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white p-1 shadow flex-shrink-0">
              <img src="/logo.webp" alt="TA Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Tax Assistance (TA)
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CMS Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                RHA Advisory & Co. • Central MySQL Administrative Management
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {/* Database live badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">MySQL:</span>
              <span className="font-mono text-emerald-400 font-bold">tax_assistance:3306</span>
            </div>

            {/* Admin User Chip */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-[#071526] font-black text-[10px] flex items-center justify-center">
                MH
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-white block leading-tight">
                  {adminUser?.name || 'Mehedi Hasan, CPA'}
                </span>
                <span className="text-[9px] text-amber-400 block leading-none">
                  Super Administrator
                </span>
              </div>
            </div>

            {/* Public site link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
              title="Open public website in new tab"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">View Public Site</span>
            </a>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/50 text-red-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Terminate administrative session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 flex-grow w-full">
        
        {/* Toast Alert */}
        {actionMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Top Control & Database Status Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Database Engine:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  MySQL (Active on Port 3306)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Database: <span className="font-mono text-slate-800 font-bold">{stats?.database?.database || 'tax_assistance'}</span> • Host: <span className="font-mono text-slate-800">{stats?.database?.host || '127.0.0.1'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync with MySQL</span>
            </button>
          </div>
        </div>

        {/* Analytics Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client Inquiries</span>
              <Inbox className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats?.inquiriesTotal ?? inquiries.length}</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1">
              {stats?.inquiriesNew ?? 0} Pending Advisor Action
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Job Candidates</span>
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats?.applicationsTotal ?? applications.length}</div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">
              CVs Stored on Server Disk
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Partner Clients</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{clients.length}</div>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              10 Industry Sectors
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Publications & SOPs</span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{resources.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Publicly Available
            </div>
          </TiltCard>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#0f2942] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#0f2942] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-[#0f2942] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Job Applicants & CVs ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'clients'
                ? 'bg-[#0f2942] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Client Companies ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'library'
                ? 'bg-[#0f2942] text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Library Resources ({resources.length})</span>
          </button>
        </div>

        {/* -------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Inquiries Quick Widget (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <h4 className="text-base font-extrabold text-slate-900">Recent Client Advisory Inquiries</h4>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs text-blue-700 font-bold hover:underline">
                    View All
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No client inquiries yet. All new inquiries submitted through the contact form will be stored in MySQL.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map(inq => (
                      <div key={inq.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{inq.fullName}</span>
                            {inq.organization && <span className="text-[11px] text-slate-500">({inq.organization})</span>}
                          </div>
                          <span className="text-[11px] text-blue-700 font-semibold block">{inq.serviceRequired}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MySQL Engine Diagnostics Card (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0a1e35] to-[#071322] text-white rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-5 h-5 text-amber-400" />
                  <h4 className="text-base font-bold">MySQL Relational Engine</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-slate-400">Host & Connection:</span>
                    <span className="font-mono text-emerald-400 font-bold">127.0.0.1:3306</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-slate-400">Active Database:</span>
                    <span className="font-mono text-white font-bold">tax_assistance</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-slate-400">Driver Architecture:</span>
                    <span className="font-mono text-amber-400">mysql2 (Promise Pool)</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-slate-400">Managed Tables:</span>
                    <span className="text-slate-200">inquiries, applications, clients, library</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                  Fully configured and operational for enterprise workloads.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 2: INQUIRIES MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header & Exporter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Client Advisory Inquiries (MySQL Table)</h4>
                <p className="text-xs text-slate-500">Manage client mandate requests, update statuses, and download attached briefs.</p>
              </div>

              <button
                onClick={exportInquiriesCSV}
                className="self-start sm:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client name, email, or service..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                {['All', 'New', 'In Progress', 'Contacted', 'Resolved'].map(st => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      inquiryStatusFilter === st
                        ? 'bg-[#0f2942] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table / Cards */}
            <div className="space-y-4">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  No inquiries match the current filter.
                </div>
              ) : (
                filteredInquiries.map(inq => (
                  <div key={inq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">{inq.fullName}</span>
                          {inq.organization && (
                            <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                              {inq.organization}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-amber-700 mt-1 block">
                          Service: {inq.serviceRequired}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete from MySQL"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 my-3 leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </p>

                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">{inq.email}</a>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${inq.phone}`} className="text-slate-800">{inq.phone}</a>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {inq.attachment && (
                          <a
                            href={inq.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] rounded-md flex items-center gap-1 shadow-2xs"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download Client File</span>
                          </a>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 3: CAREER APPLICATIONS */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Career Candidates & CV Resumes (MySQL Table)</h4>
                <p className="text-xs text-slate-500">Review candidate qualifications, update application stage, and download CV files.</p>
              </div>

              <button
                onClick={exportApplicantsCSV}
                className="self-start sm:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name, email, or role..."
                  value={applicantSearch}
                  onChange={(e) => setApplicantSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-500">Stage:</span>
                {['All', 'Submitted', 'Under Review', 'Shortlisted', 'Interviewed', 'Hired'].map(st => (
                  <button
                    key={st}
                    onClick={() => setApplicantStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      applicantStatusFilter === st
                        ? 'bg-[#0f2942] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  No job applications found matching the criteria.
                </div>
              ) : (
                filteredApplications.map(app => (
                  <div key={app.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-sm font-extrabold text-slate-900">{app.fullName}</span>
                        <span className="text-xs font-bold text-blue-800 ml-2">→ {app.positionTitle}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {app.coverLetter && (
                      <p className="text-xs text-slate-600 my-3 italic bg-white p-3 rounded-xl border border-slate-100">
                        "{app.coverLetter}"
                      </p>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">{app.email}</a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.phone}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Download Candidate CV</span>
                        </a>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.appliedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 4: CLIENT COMPANIES */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Client Partner Organizations ({clients.length})</h4>
                <p className="text-xs text-slate-500">Stored and managed inside MySQL table `clients`.</p>
              </div>

              <button
                onClick={() => setShowAddClient(!showAddClient)}
                className="px-4 py-2 bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Partner</span>
              </button>
            </div>

            {/* Add Client Form Drawer */}
            {showAddClient && (
              <form onSubmit={handleAddClientSubmit} className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <h5 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Add New Client to MySQL</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Client Company Name *"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <select
                    value={newClientCategory}
                    onChange={(e) => setNewClientCategory(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Banking, Finance, Insurance & Securities">Banking & Finance</option>
                    <option value="Consumer Products">Consumer Products</option>
                    <option value="Services">Services</option>
                    <option value="Development & Social Organizations">Development & Social Organizations</option>
                    <option value="NGO / Not-for-Profit">NGO / Not-for-Profit</option>
                    <option value="Textile & Garments">Textile & Garments</option>
                    <option value="IT & Telecommunications">IT & Telecommunications</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Energy, Power & Infrastructure">Energy & Infrastructure</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                  <select
                    value={newClientPriority}
                    onChange={(e) => setNewClientPriority(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="1st">1st Priority (Featured Logo)</option>
                    <option value="2nd">2nd Priority</option>
                    <option value="text-only">Text Only</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddClient(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg"
                  >
                    Save to MySQL
                  </button>
                </div>
              </form>
            )}

            {/* Clients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {clients.map(c => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2 hover:border-slate-300 transition">
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{c.name}</h5>
                    <span className="text-[10px] text-slate-500 block truncate">{c.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      {c.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteClient(c.id)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Client from MySQL"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 5: LIBRARY MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'library' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Library Publications (MySQL Table)</h4>
                <p className="text-xs text-slate-500">Manage statutory circulars, tax guides, and SOP blueprints.</p>
              </div>

              <button
                onClick={() => setShowAddResource(!showAddResource)}
                className="px-4 py-2 bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Publication</span>
              </button>
            </div>

            {/* Add Resource Form Drawer */}
            {showAddResource && (
              <form onSubmit={handleAddResourceSubmit} className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <h5 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Publish New Document to MySQL</h5>
                <input
                  type="text"
                  required
                  placeholder="Publication Title *"
                  value={newResTitle}
                  onChange={(e) => setNewResTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={newResCategory}
                    onChange={(e) => setNewResCategory(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Tax Updates">Tax Updates</option>
                    <option value="VAT Updates">VAT Updates</option>
                    <option value="Regulatory Updates">Regulatory Updates</option>
                    <option value="Templates & Resources">Templates & Resources</option>
                    <option value="Articles & Insights">Articles & Insights</option>
                    <option value="Guides & Checklists">Guides & Checklists</option>
                  </select>
                  <input
                    type="text"
                    value={newResYear}
                    onChange={(e) => setNewResYear(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    value={newResFormat}
                    onChange={(e) => setNewResFormat(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Summary of document..."
                  value={newResDesc}
                  onChange={(e) => setNewResDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddResource(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg"
                  >
                    Save to MySQL
                  </button>
                </div>
              </form>
            )}

            {/* Resources List */}
            <div className="space-y-3">
              {resources.map(res => (
                <div key={res.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 hover:bg-white hover:border-slate-300 transition">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                        {res.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{res.year}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">{res.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{res.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-bold text-slate-400">{res.format}</span>
                    <button
                      onClick={() => handleDeleteResource(res.id)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Publication from MySQL"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
