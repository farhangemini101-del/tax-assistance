import React, { useState, useEffect } from 'react';
import { 
  X, 
  RefreshCw, 
  Inbox, 
  GraduationCap, 
  Database, 
  Download, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle2, 
  FileText,
  Clock
} from 'lucide-react';

export default function AdminPortal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, appRes, statusRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/career/applications'),
        fetch('/api/status')
      ]);

      const inqData = await inqRes.json();
      const appData = await appRes.json();
      const stData = await statusRes.json();

      if (inqData.success) setInquiries(inqData.data);
      if (appData.success) setApplications(appData.data);
      if (stData.status) setDbStatus(stData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0f2942] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              CMS
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Tax Assistance Management Portal</h3>
              <p className="text-[11px] text-slate-300">
                DB Mode: <span className="text-amber-400 font-semibold">{dbStatus?.database?.mode || 'Connected'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition ${
              activeTab === 'inquiries'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition ${
              activeTab === 'applications'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Job Applications & CVs ({applications.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Tab 1: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No inquiries submitted yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{inq.fullName}</span>
                        {inq.organization && (
                          <span className="text-xs text-slate-500 ml-2">({inq.organization})</span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded self-start sm:self-auto">
                        {inq.serviceRequired}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mt-2 leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">{inq.email}</a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${inq.phone}`} className="text-slate-700">{inq.phone}</a>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {inq.attachment && (
                          <a
                            href={inq.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Attachment</span>
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
          )}

          {/* Tab 2: Applications */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No career applications submitted yet.
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{app.fullName}</span>
                        <span className="text-xs text-blue-700 font-semibold ml-2">
                          → {app.positionTitle}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded self-start sm:self-auto">
                        {app.status || 'Submitted'}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <p className="text-xs text-slate-600 mt-2 italic">
                        "{app.coverLetter}"
                      </p>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
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
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-md flex items-center gap-1 shadow-2xs"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View / Download CV</span>
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
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between flex-shrink-0">
          <span>Backend status: Active & connected</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
