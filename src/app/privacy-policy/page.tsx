import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ExpatCarBuyers',
  description: 'Learn how ExpatCarBuyers collects, uses, and protects your personal data.',
  alternates: {
    canonical: 'https://www.expatcarbuyers.com/privacy-policy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 lg:p-16 rounded-[2.5rem] border border-gray-100 shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Privacy Policy</h1>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">Last Updated: April 15, 2026</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
            <p>
              When you use ExpatCarBuyers for a car valuation or contact inquiry, we collect information such as your name, email address, phone number, and details about your vehicle (make, model, year, etc.).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the collected data to provide you with an accurate car valuation, contact you regarding your inquiry, and improve our services. We do not sell your personal data to third-party marketing companies. 
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is only accessible by authorized personnel.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your experience and analyze our traffic. You can choose to disable cookies in your browser settings, though some features of the site may not function properly as a result.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions regarding this privacy policy, you may contact us using the information on our <a href="/contact" className="text-[#f24026] font-bold hover:underline">Contact Page</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
