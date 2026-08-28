'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { executeRecaptcha } from '@/lib/recaptcha';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Please enter your full name';
    if (!email.trim() || !EMAIL_RE.test(email.trim())) e.email = 'Please enter a valid email address';
    if (phone.trim() && !/^\+?[0-9\s-]{7,20}$/.test(phone.trim())) e.phone = 'Please enter a valid phone number';
    if (!message.trim() || message.trim().length < 10) e.message = 'Please write at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha('contact_submit');
      await api.post('/contacts', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
        ...(recaptchaToken ? { recaptcha_token: recaptchaToken } : {}),
      });
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(
        err.response?.data?.message || 'Something went wrong sending your message. Please try again or WhatsApp us.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setSubmitError(null);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-5 py-4 bg-gray-50 border ${
      hasError ? 'border-red-400' : 'border-gray-200'
    } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition-all text-gray-900`;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'ExpatCarBuyers',
            telephone: '+971561774555',
            email: 'info@expatcarbuyers.com',
            url: 'https://www.expatcarbuyers.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Sheikh Zayed Road',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f24026]/10 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 relative text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Get in <span className="text-[#f24026]">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question about selling your car? Our team is ready to help across Dubai, Abu Dhabi, and Sharjah.
            We respond within 15 minutes.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FCF5F2] text-[#f24026] rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                    <a
                      href="tel:+971561774555"
                      className="text-lg font-bold text-gray-900 hover:text-[#f24026] transition-colors"
                    >
                      +971 56 177 4555
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e8f8f0] text-[#25d366] rounded-2xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/971561774555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-gray-900 hover:text-[#25d366] transition-colors"
                    >
                      +971 56 177 4555
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FCF5F2] text-[#f24026] rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                    <a
                      href="mailto:info@expatcarbuyers.com"
                      className="text-lg font-bold text-gray-900 hover:text-[#f24026] transition-colors break-all"
                    >
                      info@expatcarbuyers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FCF5F2] text-[#f24026] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-base font-bold text-gray-900">Sheikh Zayed Road, Dubai, UAE</p>
                    <p className="text-sm text-gray-500 mt-1">Abu Dhabi & Sharjah branches also available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp quick CTA */}
            <a
              href="https://wa.me/971561774555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25d366] text-white font-extrabold rounded-2xl hover:bg-[#1ebe5d] transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Hours */}
            <div className="bg-[#f24026]/5 p-6 rounded-2xl border border-[#FFD0C9]">
              <h3 className="font-bold text-gray-900 mb-4">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday – Saturday</span>
                  <span className="font-bold text-gray-900">8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-bold text-gray-900">10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WhatsApp</span>
                  <span className="font-bold text-[#f24026]">24 / 7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f24026]/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />

              {success ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-[#FCF5F2] text-[#f24026] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Received!</h2>
                  <p className="text-gray-600 max-w-sm mx-auto mb-8">
                    Thank you for reaching out. One of our car experts will contact you within 15 minutes during
                    business hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={reset}
                      className="px-8 py-3 bg-[#f24026] text-white font-bold rounded-2xl hover:bg-[#d63520] transition-colors shadow-lg"
                    >
                      Send Another Message
                    </button>
                    <a
                      href="https://wa.me/971561774555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-[#25d366] text-white font-bold rounded-2xl hover:bg-[#1ebe5d] transition-colors"
                    >
                      Or WhatsApp Us
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Send Us a Message</h2>
                    <p className="text-gray-500 mt-1">We'll get back to you within 15 minutes.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 56 177 4555"
                      type="tel"
                      className={inputClass(!!errors.phone)}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="Tell us about your car, your location, or any question you have..."
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#f24026] text-white font-bold rounded-2xl hover:bg-[#d63520] transition-all shadow-lg shadow-red-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-400">
                    Prefer instant contact?{' '}
                    <a
                      href="https://wa.me/971561774555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25d366] font-bold hover:underline"
                    >
                      WhatsApp us directly
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
