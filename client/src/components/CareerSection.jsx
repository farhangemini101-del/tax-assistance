import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  UploadCloud, 
  X, 
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';

export default function CareerSection({ vacancies = [] }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const perks = [
    "Professional learning environment with mentorship from senior CPAs & tax practitioners",
    "Direct exposure to diverse industries, multinational brands, and NGOs",
    "Continuous professional development & certification support",
    "Collaborative working environment emphasizing ethics and innovation",
    "Hands-on exposure to real-world business, audit, and tax challenges",
    "Accelerated career growth and leadership opportunities"
  ];

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setSubmitStatus(null);
    setApplicationModalOpen(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please select your CV / Resume file (PDF, DOC, or DOCX).');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('positionId', selectedJob?.id || 'general');
      formData.append('positionTitle', selectedJob?.position || 'General Application');
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resumeFile);

      const response = await fetch('/api/career/apply', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFullName('');
        setEmail('');
        setPhone('');
        setCoverLetter('');
        setResumeFile(null);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Submission failed' });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit application: ' + err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="career" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
            Build Your Career With Us
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            At Tax Assistance, we believe our people are the foundation of our success. We are always interested in meeting 
            talented, motivated, and ethical professionals eager to shape the future of professional advisory.
          </p>
        </div>

        {/* Why Join Us & Culture */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 mb-16">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-slate-900">Why Join Tax Assistance?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We offer opportunities to work across Tax, VAT, Audit & Assurance, Consulting, RJSC Secretarial, and AI Automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium leading-relaxed">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Vacancies List */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Current Open Vacancies</h3>
              <p className="text-xs text-slate-500">Explore active recruitment roles at our Dhaka headquarters</p>
            </div>
            <button
              onClick={() => handleOpenApply({ position: 'General Application / Talent Pool', id: 'talent-pool' })}
              className="self-start sm:self-auto text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
            >
              <span>Don't see your role? Submit spontaneous CV</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {vacancies.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.employmentType}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900">{job.position}</h4>
                    <p className="text-xs text-amber-700 font-semibold mt-1">
                      Experience: {job.experience} • Application Deadline: {job.deadline}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenApply(job)}
                    className="self-start lg:self-auto px-6 py-2.5 bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Job Details Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                      Key Responsibilities
                    </h5>
                    <ul className="space-y-2">
                      {job.responsibilities?.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                      Required Qualifications & Skills
                    </h5>
                    <ul className="space-y-2">
                      {job.qualifications?.map((qual, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Application Modal */}
      {applicationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setApplicationModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Online Application
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {selectedJob?.position}
              </h3>
              <p className="text-xs text-slate-500">Tax Assistance (TA), RHA Advisory & Co.</p>
            </div>

            {submitStatus && (
              <div className={`p-4 rounded-xl text-xs mb-5 flex items-start gap-2 ${
                submitStatus.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{submitStatus.message}</span>
              </div>
            )}

            {submitStatus?.type !== 'success' && (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abdullah Al Mamun"
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1XXXXXXXXX"
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload CV / Resume (PDF or DOCX) *
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer transition">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-blue-700">
                        {resumeFile ? resumeFile.name : 'Click to select CV document'}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Maximum file size: 10MB</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brief Note / Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly state your relevant experience, CA/CMA background, and notice period..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Job Application'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
