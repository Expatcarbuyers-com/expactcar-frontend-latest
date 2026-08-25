import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://www.expatcarbuyers.com";
const DEFAULT_TITLE = "ExpatCarBuyers | Sell Your Car in 30 Minutes";
const DEFAULT_DESCRIPTION = "The fastest way to sell your car in Dubai & UAE. Instant valuation, cash in hand.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    icons: {
        icon: "/favicon.webp",
    },
    // Sitewide defaults so every page has working OG/Twitter tags even before
    // it sets its own — individual pages override title/description/openGraph
    // as needed via their own metadata export.
    openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        siteName: "ExpatCarBuyers",
        images: ["/front/images/our-gurantee-right.webp"],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: ["/front/images/our-gurantee-right.webp"],
    },
};

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
                {/* Google tag (gtag.js) is injected server-side in server.js, spliced
                    in as raw text immediately after this <head> tag. React's renderer
                    can't produce a byte-exact match of Google's snippet (it always
                    quotes boolean attributes like async="" and interleaves its own
                    <script> tags in <head>), so this is done below the framework
                    entirely. Do not also add it here — see server.js. */}
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
