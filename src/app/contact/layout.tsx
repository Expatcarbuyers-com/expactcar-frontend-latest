import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Sell Your Car in UAE – ExpatCarBuyers',
    description:
        'Get in touch with ExpatCarBuyers to sell your car, get a free valuation, or book an appointment. Call, WhatsApp, or visit our Dubai office — we respond within 15 minutes.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
