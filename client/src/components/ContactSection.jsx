import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Paperclip, 
  CheckCircle2, 
  AlertCircle,
  Building,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function ContactSection({ preSelectedService = '' }) {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState('Audit & Assurance');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (preSelectedService) {
      setServiceRequired(preSelectedService);
    }
  }, [preSelectedService]);

  const serviceOptions = [
    'Audit & Assurance',
    'Direct Tax - Corporate',
    'Direct Tax - Personal',
    'Indirect Tax - VAT',
    'Consulting & Accounting Services',
    'Consulting - Automation with AI',
    'Business Process & SOP Development',
    'Payroll & Asset Management',
    'Business Support - RJSC Incorporations',
    'Business Support - BIDA Consultancy',
    'Licenses & Government Registrations',
    'General Tax Advisory & Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('organization', organization);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('serviceRequired', serviceRequired);
      formData.append('message', message);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Thank you! Your inquiry has been submitted successfully.'
        });
        setFullName('');
        setOrganization('');
        setEmail('');
        setPhone('');
        setMessage('');
        setAttachment(null);
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Failed to submit inquiry.'
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'Network error submitting inquiry: ' + err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-blue-700" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
            Let's Talk
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you need tax assistance, audit support, accounting solutions, business consulting, 
            regulatory assistance, or help establishing and growing your business in Bangladesh, our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Details & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Principal Office Location
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Address</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">
                      Tax Assistance (TA), RHA Advisory & Co.
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Level 3, Ventura Iconia, Holding 37, Road No. 11, Dhaka 1213, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Telephone</h4>
                    <a href="tel:+8801767690408" className="text-sm font-bold text-slate-900 hover:text-blue-700 mt-1 block">
                      +880 1767-690408
                    </a>
                    <span className="text-[11px] text-slate-500">Available Sunday – Thursday (9:00 AM – 6:30 PM)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Electronic Mail</h4>
                    <a href="mailto:info@tax-assistance.com" className="text-sm font-bold text-slate-900 hover:text-blue-700 mt-1 block">
                      info@tax-assistance.com
                    </a>
                    <span className="text-[11px] text-slate-500">Inquiries typically answered within 2 hours</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/8801767690408?text=Hello,%20I%20would%20like%20to%20consult%20with%20Tax%20Assistance%20firm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Ventura+Iconia+Road+11+Dhaka+1213+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Open Maps</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-64 bg-slate-200">
              <iframe
                title="Tax Assistance Office Location - Ventura Iconia Dhaka"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1039868772987!2d90.40375681536254!3d23.790013593450916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c5ff23b2b%3A0x6b4cf84f09e3e3b5!2sRoad%2011%2C%20Dhaka%201213%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Direct Advisory Request
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  Submit An Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below and our partners will review your mandate and respond promptly.
                </p>
              </div>

              {feedback && (
                <div className={`p-4 rounded-xl text-xs mb-6 flex items-start gap-2.5 ${
                  feedback.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mehedi Hasan"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Acme Holdings Ltd."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@company.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 text-slate-800"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Requirements Summary *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your organization's specific requirements, timeline, and challenges..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Attach Relevant Document (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-2 transition">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{attachment ? attachment.name : 'Choose File'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setAttachment(e.target.files[0])}
                      />
                    </label>
                    {attachment && (
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0f2942] hover:bg-blue-900 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-400 mt-2">
                  🔒 We guarantee complete confidentiality and adherence to Bangladesh Bar Association ethics.
                </p>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
