import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "ExpatCarBuyers | Sell Your Car in 30 Minutes",
    description: "The fastest way to sell your car in Dubai & UAE. Instant valuation, cash in hand.",
    icons: {
        icon: "/favicon.png",
    },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/font-awesome/css/all.min.css" />

                {GA_MEASUREMENT_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="ga-init" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_MEASUREMENT_ID}');
                            `}
                        </Script>
                    </>
                )}
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <Providers>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </Providers>

                <Script src="/front/js/wow.min.js" strategy="afterInteractive" />
                <Script id="init-wow" strategy="afterInteractive">
                    {`
                        function initWOW() {
                            if (typeof WOW !== 'undefined' && window.location.pathname === '/') {
                                new WOW({ animateClass: 'animated', offset: 100 }).init();
                            } else {
                                // Force visibility for .wow elements if WOW is not initialized
                                const style = document.createElement('style');
                                style.innerHTML = '.wow { visibility: visible !important; animation: none !important; }';
                                document.head.appendChild(style);
                            }
                        }
                        if (document.readyState === 'complete') {
                            initWOW();
                        } else {
                            window.addEventListener('load', initWOW);
                        }
                    `}
                </Script>
            </body>
        </html>
    );
}
