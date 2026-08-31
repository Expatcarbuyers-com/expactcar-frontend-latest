import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Sell Your Car in UAE – ExpatCarBuyers',
    description:
        'Get in touch with ExpatCarBuyers to sell your car, get a free valuation, or book an appointment. Call, WhatsApp, or visit our Dubai office — we respond within 15 minutes.',
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/contact',
    },
    openGraph: {
        title: 'Contact Us | Sell Your Car in UAE – ExpatCarBuyers',
        description: 'Get in touch with ExpatCarBuyers. Call, WhatsApp, or visit our Dubai office.',
        url: 'https://www.expatcarbuyers.com/contact',
        siteName: 'ExpatCarBuyers',
        images: ['/front/images/our-gurantee-right.webp'],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | Sell Your Car in UAE – ExpatCarBuyers',
        description: 'Get in touch with ExpatCarBuyers. Call, WhatsApp, or visit our Dubai office.',
        images: ['/front/images/our-gurantee-right.webp'],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
