import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, Car, ArrowRight, ExternalLink } from 'lucide-react';

export default function ContactPage() {
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
            hasMap: 'https://maps.app.goo.gl/J5k4P5uhxXGvBzzA7',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Sheikh Zayed Road, Al Quoz',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '08:00',
                closes: '20:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday'],
                opens: '10:00',
                closes: '18:00',
              },
            ],
          }),
        }}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f24026]/10 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
            Live Customer Support
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Contact <span className="text-[#f24026]">ExpatCarBuyers</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to sell your car or have questions? Get in touch directly with our vehicle purchasing specialists in Dubai.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Phone Call Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#FCF5F2] text-[#f24026] rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Our Experts</h3>
              <p className="text-gray-500 text-sm mb-6">
                Speak directly with an inspector or pricing expert for instant guidance.
              </p>
            </div>
            <a
              href="tel:+971561774555"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#f24026] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +971 56 177 4555
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#25d366]/20 shadow-xl shadow-emerald-50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#25d366] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Fastest Reply
            </div>
            <div>
              <div className="w-14 h-14 bg-[#e8f8f0] text-[#25d366] rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Us 24/7</h3>
              <p className="text-gray-500 text-sm mb-6">
                Send photos, car details, or ask quick questions on WhatsApp. We reply instantly.
              </p>
            </div>
            <a
              href="https://wa.me/971561774555"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#25d366] text-white font-bold rounded-2xl hover:bg-[#1ebe5d] transition-colors shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Email Inquiries Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-[#FCF5F2] text-[#f24026] rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Inquiries</h3>
              <p className="text-gray-500 text-sm mb-6">
                For corporate fleet sales, commercial partnerships, or general inquiries.
              </p>
            </div>
            <a
              href="mailto:info@expatcarbuyers.com"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#f24026] transition-colors break-all"
            >
              <Mail className="w-4 h-4" />
              info@expatcarbuyers.com
            </a>
          </div>
        </div>

        {/* Valuation Promotion Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-8 sm:p-12 text-white mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f24026]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f24026]/20 text-[#ff715b] text-xs font-extrabold uppercase tracking-wider mb-4">
                <Car className="w-4 h-4" /> Free 30-Second Online Quote
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                Want to know your car's valuation right now?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">
                Enter your car make, model, and year to get an instant estimate and book a free door-step inspection in Dubai.
              </p>
            </div>
            <Link
              href="/car-valuation"
              className="px-8 py-4 bg-[#f24026] hover:bg-[#d63520] text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-red-500/30 flex items-center gap-3 shrink-0 group"
            >
              Get Free Valuation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Locations & Working Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Branch Locations & Hours */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                Visit Our Inspection Site
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Drive to our dedicated physical inspection center in Dubai or book our mobile team to inspect your vehicle directly at your home or office.
              </p>
            </div>

            <div className="space-y-4">
              {/* Primary Inspection Site Card */}
              <div className="p-6 bg-[#FCF5F2] rounded-2xl border-2 border-[#f24026]/20 flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f24026] text-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-gray-900 text-lg">Inspection Site</h4>
                    <span className="bg-[#f24026] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Main</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mt-1">Expat Car Buyers - Sell any car</p>
                  <p className="text-sm text-gray-600">Sheikh Zayed Road, Al Quoz Industrial Area, Dubai, UAE</p>
                  <a
                    href="https://maps.app.goo.gl/J5k4P5uhxXGvBzzA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#f24026] hover:underline mt-2"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Mobile Service Card */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm text-[#f24026] flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Doorstep Mobile Inspection</h4>
                  <p className="text-sm text-gray-600 mt-1">Free at-home or at-office car inspection and instant payment anywhere in Dubai</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FCF5F2] rounded-2xl border border-[#FFD0C9]">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-[#f24026]" />
                <h4 className="font-bold text-gray-900">Operating Hours</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Monday – Saturday</p>
                  <p className="font-bold text-gray-900">8:00 AM – 8:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-500">Sunday</p>
                  <p className="font-bold text-gray-900">10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed Pinpointing the exact Inspection Site */}
          <div className="h-[450px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-xl relative">
            <iframe
              title="Expat Car Buyers - Sell any car Inspection Site Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.423985397441!2d55.21786357595393!3d25.11158717776495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b44e5d599e5%3A0x5ef0fe7dd34ca4bc!2sExpat%20Car%20Buyers%20-%20Sell%20any%20car!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
