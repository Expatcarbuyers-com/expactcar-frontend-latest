import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ExpatCarBuyers',
  description: 'Read the terms and conditions for using the ExpatCarBuyers car valuation and buying service.',
  alternates: {
    canonical: 'https://www.expatcarbuyers.com/terms-conditions',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 lg:p-16 rounded-[2.5rem] border border-gray-100 shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Terms & Conditions</h1>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">Last Updated: April 15, 2026</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ExpatCarBuyers, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Valuation Accuracy</h2>
            <p>
              The online valuation provided by our tool is an estimate based on the information provided by you. The final offer is subject to an on-site physical inspection of the vehicle. We reserve the right to adjust or withdraw any offer based on the actual condition of the car.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. User Obligations</h2>
            <p>
              You represent and warrant that the information you provide about your vehicle is accurate and complete. You must be the legal owner or have the legal authority to sell the vehicle.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Selling Process</h2>
            <p>
              Once a price is agreed upon after inspection, we will handle the RTA transfer and payment process. Payment is typically made via secure bank transfer or cash (within legal limits).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Limitation of Liability</h2>
            <p>
              ExpatCarBuyers shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the United Arab Emirates.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
