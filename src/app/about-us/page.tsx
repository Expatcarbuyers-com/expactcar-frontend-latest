import type { Metadata } from 'next';
import { Target, Users, ShieldCheck, Heart } from 'lucide-react';

const TITLE = 'About ExpatCarBuyers | The Trusted Way to Sell Your Car in UAE';
const DESCRIPTION = 'Learn about ExpatCarBuyers, the leading car buying service in Dubai & UAE, and our mission to make selling your car fast, safe, and transparent.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.expatcarbuyers.com/about-us',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.expatcarbuyers.com/about-us',
    siteName: 'ExpatCarBuyers',
    images: ['/front/images/our-gurantee-right.webp'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/front/images/our-gurantee-right.webp'],
  },
};

const stats = [
  { label: 'Cars Bought', value: '15,000+' },
  { label: 'Happy Customers', value: '12,000+' },
  { label: 'Expert Inspectors', value: '50+' },
  { label: 'Years Experience', value: '10+' },
];

const values = [
  {
    icon: Target,
    title: 'Transparency',
    description: 'No hidden fees or complex paperwork. We provide clear valuations and instant payments.',
    color: 'bg-[#FCF5F2] text-[#f24026]',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Your safety is our priority. We handle all RTA paperwork and ensure secure bank transfers.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Users,
    title: 'Expat Focused',
    description: 'We understand the unique needs of the expat community in the UAE.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Our team is dedicated to providing a stress-free experience from start to finish.',
    color: 'bg-red-50 text-red-600',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f24026]/10 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight">
              Reinventing How You <span className="text-[#f24026]">Sell Your Car</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              At ExpatCarBuyers, we believe selling your car should be as simple as buying a cup of coffee. No haggling, no time-wasters, just instant cash in your pocket.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-extrabold text-[#f24026] mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800" 
                    alt="Our Office" 
                    className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#f24026] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-white shadow-xl">
                 <p className="text-4xl font-extrabold mb-2">100%</p>
                 <p className="text-center font-bold text-[#FFD0C9]">Commitment to transparency and fair pricing</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Our Story</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Founded a decade ago in the heart of Dubai, ExpatCarBuyers was born out of a simple observation: the car selling process was broken. People were tired of endless phone calls, classified scams, and aggressive haggling at dealerships.
                </p>
                <p>
                  We set out to create a service that we would want to use ourselves. A service that is built on trust, efficiency, and speed. Today, we are proud to be the UAE's most trusted partner for thousands of sellers every year.
                </p>
                <p>
                  From luxury SUVs to family sedans, we buy cars of all makes and models, offering a global reach and local expertise that is unmatched in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are the principles that guide everything we do, from the first valuation to the final payment.
          </p>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-[#f24026] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 relative z-10">Ready to Sell Your Car?</h2>
            <p className="text-xl text-[#FFD0C9] max-w-2xl mx-auto mb-12 relative z-10">
              Join thousands of happy customers and experience the easiest way to sell your car in the UAE.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <a href="/" className="px-10 py-4 bg-white text-[#f24026] font-extrabold rounded-2xl hover:bg-gray-100 transition-all shadow-xl">
                Get Free Valuation
              </a>
              <a href="/contact" className="px-10 py-4 bg-[#d6351f] text-white font-extrabold rounded-2xl hover:bg-[#b82c19] transition-all">
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
