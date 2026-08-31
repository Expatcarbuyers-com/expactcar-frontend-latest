import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import FAQAccordion from '@/components/home/FAQAccordion';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';

export const revalidate = 3600;

const TITLE = 'Sell My Car in Dubai | Sell Any Car for Cash | ExpatCarBuyers';
const DESCRIPTION = "Sell my car in Dubai in 30 minutes. Free inspection, instant valuation, fair cash offer — no hidden fees. The UAE's trusted way to sell any car.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/',
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: 'https://www.expatcarbuyers.com/',
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

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExpatCarBuyers',
    url: 'https://www.expatcarbuyers.com',
    logo: 'https://www.expatcarbuyers.com/front/images/logo.png',
    description: 'We buy any car in the UAE — instant valuation, free inspection, cash in 30 minutes.',
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    telephone: '+971561774555',
    email: 'contact@expatcarbuyers.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'office No. G17, Al Asmawi Building',
        addressLocality: 'Sheikh Zayed Road',
        addressRegion: 'Dubai',
        addressCountry: 'United Arab Emirates',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '2467',
    },
    sameAs: [
        'https://www.facebook.com/ExpatCarBuyers/',
        'https://www.instagram.com/expatcarbuyers/',
        'https://twitter.com/expatcarbuyers',
    ],
};

/* ── Inline SVGs ────────────────────────────────────────────── */
const CheckIcon = () => (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none" className="flex-shrink-0 mt-0.5">
        <path d="M14.5705 29.9617C14.3898 29.9617 14.2087 29.9585 14.0273 29.952C11.8808 29.8714 9.77868 29.3174 7.87133 28.3296C5.96398 27.3417 4.29857 25.9445 2.9943 24.2379C1.69003 22.5314 0.779134 20.5576 0.326805 18.4579C-0.125524 16.3582 -0.108103 14.1844 0.37782 12.0922C0.863742 10 1.80615 8.04112 3.13761 6.35565C4.46907 4.67019 6.15665 3.29985 8.07959 2.34271C10.0025 1.38557 12.1133 0.865289 14.2608 0.819105C16.4083 0.77292 18.5395 1.20197 20.5018 2.07556C20.663 2.14485 20.8088 2.24548 20.9308 2.37158C21.0528 2.49769 21.1485 2.64677 21.2124 2.81017C21.2763 2.97357 21.3071 3.14803 21.303 3.32343C21.2989 3.49883 21.2601 3.67168 21.1887 3.83193C21.1172 3.99219 21.0147 4.13667 20.887 4.25698C20.7593 4.37729 20.6089 4.47103 20.4447 4.53278C20.2805 4.59452 20.1056 4.62303 19.9303 4.61664C19.7549 4.61026 19.5826 4.56912 19.4233 4.4956C17.0745 3.44936 14.4505 3.1903 11.9425 3.75706C9.43449 4.32381 7.17687 5.68602 5.50631 7.64053C3.83575 9.59504 2.84175 12.0372 2.67254 14.6027C2.50333 17.1682 3.16797 19.7197 4.56735 21.8767C5.96689 24.0335 8.02616 25.6803 10.4381 26.5713C12.85 27.4623 15.4853 27.5499 17.9511 26.821C20.4168 26.0921 22.5809 24.5858 24.1206 22.5266C25.6603 20.4674 26.4931 17.9657 26.4948 15.3947V14.1758C26.4948 13.8244 26.6344 13.4874 26.8829 13.239C27.1314 12.9905 27.4684 12.851 27.8198 12.851C28.1712 12.851 28.5082 12.9905 28.7566 13.239C29.0051 13.4874 29.1447 13.8244 29.1447 14.1758V15.3947C29.1431 19.2587 27.6068 22.9638 24.8738 25.6955C22.1408 28.4272 18.4348 29.9617 14.5705 29.9617Z" fill="#34A853" />
        <path d="M14.57 19.3825C14.396 19.3825 14.2236 19.3483 14.0628 19.2818C13.902 19.2153 13.7559 19.1177 13.6328 18.9947L9.65805 15.0202C9.41671 14.7703 9.28316 14.4357 9.28618 14.0883C9.2892 13.7409 9.42854 13.4086 9.67419 13.163C9.91985 12.9174 10.2522 12.778 10.5995 12.775C10.9469 12.772 11.2816 12.9055 11.5315 13.1469L14.57 16.1834L26.8821 3.85971C27.1318 3.61825 27.4664 3.48456 27.8138 3.48741C28.1612 3.49026 28.4936 3.62944 28.7394 3.87496C28.9851 4.12048 29.1246 4.45271 29.1278 4.80008C29.131 5.14745 28.9976 5.48217 28.7564 5.73215L15.5072 18.9938C15.3841 19.117 15.238 19.2147 15.0772 19.2814C14.9164 19.3481 14.7441 19.3824 14.57 19.3825Z" fill="#34A853" />
    </svg>
);

const howItWorks = [
    {
        icon: (
            <svg width="36" height="34" viewBox="0 0 36 34" fill="none">
                <path d="M24.6602 5.37372L30.185 10.8831C30.2968 10.995 30.3596 11.1465 30.3596 11.3044C30.3596 11.4624 30.2968 11.6139 30.185 11.7257L23.4833 18.4087L16.8078 25.0657L11.1236 25.6946C10.9458 25.7145 10.7657 25.6942 10.5968 25.6353C10.428 25.5763 10.2746 25.4801 10.148 25.354C10.0215 25.2278 9.9251 25.0748 9.86596 24.9064C9.80682 24.738 9.78647 24.5585 9.80642 24.3811L10.4371 18.7128L23.8144 5.37372C23.9266 5.26195 24.0787 5.19916 24.2373 5.19916C24.3959 5.19916 24.548 5.26195 24.6602 5.37372ZM34.5843 3.97509L31.5936 0.994544C31.1447 0.548672 30.5368 0.29834 29.9032 0.29834C29.2696 0.29834 28.6617 0.548672 28.2127 0.994544L26.0471 3.1585C25.9353 3.27037 25.8725 3.42188 25.8725 3.57983C25.8725 3.73778 25.9353 3.88929 26.0471 4.00116L31.5692 9.50879C31.6814 9.6203 31.8334 9.68291 31.9917 9.68291C32.1501 9.68291 32.3021 9.6203 32.4143 9.50879L34.5843 7.34656C35.0314 6.89884 35.2824 6.2927 35.2824 5.66083C35.2824 5.02896 35.0314 4.42282 34.5843 3.97509ZM23.5208 24.9128V29.3936H3.92013V9.84759H11.898C12.0935 9.84664 12.2809 9.77001 12.4207 9.63388L14.8712 7.19106C14.9743 7.08837 15.0444 6.95745 15.0727 6.81494C15.1011 6.67242 15.0863 6.52473 15.0303 6.39061C14.9743 6.25648 14.8796 6.14197 14.7582 6.06161C14.6368 5.98125 14.4942 5.93866 14.3485 5.93925H2.9401C2.16056 5.93948 1.413 6.24833 0.861698 6.79793C0.310397 7.34753 0.000461779 8.09292 0 8.87029L0 30.3709C0.000230917 31.1484 0.310065 31.894 0.86139 32.4438C1.41272 32.9936 2.16041 33.3026 2.9401 33.3028H24.5008C25.2805 33.3026 26.0282 32.9936 26.5795 32.4438C27.1308 31.894 27.4407 31.1484 27.4409 30.3709V22.4656C27.4411 22.3205 27.3981 22.1786 27.3175 22.0579C27.2368 21.9371 27.1221 21.8429 26.9878 21.7871C26.8534 21.7313 26.7055 21.7165 26.5628 21.7445C26.42 21.7725 26.2887 21.8421 26.1856 21.9444L23.736 24.3881C23.5983 24.5283 23.5211 24.7166 23.5208 24.9128Z" fill="#F24026" />
            </svg>
        ),
        title: 'Book an Appointment',
        desc: 'Let us know a time that works best for you and book an appointment for a vehicle inspection at your convenience. Book online here or visit our central offices in Dubai, Abu Dhabi, or Sharjah.',
    },
    {
        icon: (
            <svg width="39" height="28" viewBox="0 0 39 28" fill="none">
                <path d="M37.1787 8.73644H32.8333L31.6257 5.687C31.0271 4.16039 29.9869 2.85143 28.6408 1.93086C27.2947 1.0103 25.7051 0.520865 24.0795 0.526414H14.8622C13.2365 0.520941 11.6469 1.01039 10.3006 1.93093C8.95433 2.85147 7.91392 4.16039 7.31504 5.687L6.1074 8.73644H1.76301C1.63071 8.73639 1.50013 8.76682 1.38122 8.82541C1.26231 8.88399 1.15819 8.9692 1.07678 9.07454C0.995377 9.17989 0.938827 9.3026 0.911433 9.43334C0.884039 9.56407 0.886524 9.6994 0.918698 9.82903L1.35427 11.5888C1.40125 11.7791 1.50988 11.948 1.66288 12.0688C1.81587 12.1895 2.00444 12.255 2.19859 12.255H3.656C3.15461 12.6911 2.75196 13.231 2.47538 13.8381C2.1988 14.4452 2.05477 15.1053 2.05305 15.7736V19.2922C2.05669 20.4253 2.46958 21.5181 3.21424 22.3656V26.3273C3.21397 26.6355 3.27384 26.9407 3.39042 27.2256C3.50701 27.5104 3.67804 27.7693 3.89372 27.9873C4.1094 28.2053 4.3655 28.3783 4.6474 28.4963C4.9293 28.6143 5.23146 28.6751 5.53661 28.6751H7.85899C8.47492 28.6751 9.06563 28.4279 9.50116 27.988C9.93669 27.5481 10.1814 26.9515 10.1814 26.3294V23.9836H28.7604V26.3294C28.7604 26.9515 29.0051 27.5481 29.4406 27.988C29.8761 28.4279 30.4668 28.6751 31.0827 28.6751H33.4051C34.0211 28.6751 34.6118 28.4279 35.0473 27.988C35.4828 27.5481 35.7275 26.9515 35.7275 26.3294V22.3677C36.4728 21.5198 36.8857 20.4261 36.8887 19.2922V15.7736C36.887 15.1054 36.7431 14.4454 36.4667 13.8383C36.1903 13.2312 35.7879 12.6912 35.2868 12.255H36.7432C36.9373 12.255 37.1259 12.1895 37.2789 12.0688C37.4319 11.948 37.5405 11.7791 37.5875 11.5888L38.023 9.83007C38.055 9.70037 38.0573 9.56503 38.0298 9.4343C38.0023 9.30357 37.9456 9.18089 37.8641 9.07558C37.7826 8.97027 37.6785 8.88509 37.5595 8.8265C37.4406 8.76792 37.31 8.73748 37.1777 8.73748L37.1787 8.73644Z" fill="#F24026" />
            </svg>
        ),
        title: 'Bring Your Vehicle',
        desc: 'Trust us to give your vehicle a professional inspection. Simply drive your car over to your nearest inspection point and allow us to carry out a free of charge professional inspection.',
    },
    {
        icon: (
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
                <path d="M0.625 15.3721V3.58546C0.625 2.85035 0.914139 2.14534 1.42881 1.62554C1.94348 1.10574 2.64153 0.813721 3.36938 0.813721L15.0397 0.813721C15.7675 0.813932 16.4654 1.10609 16.9799 1.62594L29.0958 13.8626C29.3507 14.12 29.5528 14.4256 29.6907 14.7619C29.8287 15.0982 29.8997 15.4586 29.8997 15.8226C29.8997 16.1866 29.8287 16.547 29.6907 16.8833C29.5528 17.2196 29.3507 17.5251 29.0958 17.7825L17.4239 29.5667C17.169 29.8241 16.8665 30.0282 16.5335 30.1675C16.2006 30.3068 15.8437 30.3785 15.4833 30.3785C15.1229 30.3785 14.766 30.3068 14.4331 30.1675C14.1001 30.0282 13.7975 29.8241 13.5427 29.5667L1.42677 17.33C0.913339 16.8103 0.624993 16.1062 0.625 15.3721Z" fill="#F24026" />
            </svg>
        ),
        title: 'Get a No-Obligation Quote',
        desc: "Receive a fair non-obligation quote. We will offer you a quote based on the findings of our inspection. But don't worry, this is completely obligation free — the choice to sell is 100% with you.",
    },
    {
        icon: (
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
                <path d="M28.9572 5.08573C28.646 4.2234 28.1517 3.44038 27.509 2.79172C26.8662 2.14306 26.0907 1.6445 25.2368 1.33108C23.6389 0.813477 22.1874 0.813477 19.2355 0.813477H10.38C7.45249 0.813477 5.97656 0.813477 4.40305 1.30643C3.54754 1.6216 2.77095 2.12268 2.12812 2.77428C1.48528 3.42589 0.991868 4.21214 0.682726 5.07751C0.182617 6.67961 0.182617 8.15846 0.182617 11.1162V20.0715C0.182617 23.0415 0.182617 24.508 0.670528 26.1101C0.980676 26.974 1.47454 27.7586 2.11732 28.4088C2.7601 29.0589 3.53617 29.5587 4.39085 29.873C5.97656 30.3783 7.44029 30.3783 10.3678 30.3783H19.2477C22.1874 30.3783 23.6511 30.3783 25.2246 29.8853C26.0824 29.5717 26.8614 29.0713 27.5064 28.4196C28.1514 27.7679 28.6467 26.9809 28.9572 26.1142C29.4573 24.5121 29.4573 23.0333 29.4573 20.0756V11.1408C29.4573 8.17079 29.4573 6.69193 28.9572 5.08984V5.08573Z" fill="#F24026" />
            </svg>
        ),
        title: "Happy with the price? Get Paid!",
        desc: "Get paid. If you are happy with the offer that we make you, simply give us a thumbs up and we will put the cash right in your hand there and then! It has never been easier to sell any car in UAE!",
    },
];

const trustFeatures = [
    { icon: '/front/images/Free-Car-Valuation.svg', title: 'Free Car Valuation', desc: 'Get a non-obligation quote for your car based on the physical condition and the market price.' },
    { icon: '/front/images/Ownership-Transfer.svg', title: 'Ownership Transfer', desc: 'We are authorized by RTA, and our professionals will transfer the car in our office, with no hassles!' },
    { icon: '/front/images/Finance-Cleared.svg', title: 'Finance Settlement', desc: 'We clear the outstanding finance on cars and pay the difference to customers.' },
    { icon: '/front/images/Instant-Cash.svg', title: 'Instant Cash', desc: 'You can sell a car in 30 minutes and receive cash, bank transfer or cheque, based on your choice!' },
];

const guaranteeItems = [
    'A guaranteed quick and hassle-free sale',
    'Secure finance settlement',
    'On the spot cash in hand payment',
    'Safe, secure and trusted process',
    'All RTA paperwork taken care of for you',
    '0 hidden or unforeseen costs. What you see is what you get',
    'No obligation No pressure quote',
    'Free professional car inspection',
];

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="hero-section">
                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 mb-6 leading-tight wow fadeInDown" data-wow-delay="0.15s">
                            Sell Any Car in UAE with <span className="text-[#f24026]">Expat Car Buyers</span> — Quick, Easy & Hassle-Free
                        </h1>
                        <p className="text-lg md:text-xl text-[#606568] max-w-3xl mx-auto mb-10 leading-relaxed wow fadeInUp" data-wow-delay="0.3s">
                            Looking to sell your car in <span className="font-bold text-gray-900">Sharjah or Abu Dhabi</span> quickly and without hassle? We make it incredibly easy to sell any car online — from the comfort of your home or office. Get an instant valuation today!
                        </p>
                        <div className="bg-white rounded-[2rem] shadow-2xl p-4 md:p-6 max-w-2xl mx-auto border border-gray-100">
                            <ValuationFormServer />
                        </div>
                    </div>
                </div>
                <div className="hero-car-strip">
                    <img className="car" src="/front/images/car.svg" loading="lazy" alt="car" />
                    <div id="moving-type-left"><div className="circle1" /></div>
                    <div id="moving-type-right"><div className="circle2" /></div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                HOW IT WORKS
            ══════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-3 wow fadeIn">
                        Sounds great, but{' '}
                        <span className="text-[#f24026]">how do I sell my car in UAE?</span>
                    </h2>
                    <p className="text-center text-[#626161] mb-12 max-w-xl mx-auto">
                        Our simple 4-step process gets you cash in hand in as little as 30 minutes.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorks.map((step, i) => (
                            <div
                                key={step.title}
                                className="work-box wow fadeInUp"
                                data-wow-delay={`${i * 0.1}s`}
                            >
                                <div className="mb-4 flex justify-center">{step.icon}</div>
                                <div className="font-bold text-gray-900 mb-2 text-base">{step.title}</div>
                                <p className="text-sm text-[#626161] leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                CONTENT — AVOID THE CONS
            ══════════════════════════════════════════════ */}
            <section className="py-12 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="content-card wow fadeInUp">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                            Avoid the cons and find out what your car is really worth —{' '}
                            <span className="text-[#f24026]">Find Out and Sell Any Car with Confidence!</span>
                        </h2>
                        <div className="space-y-3 text-[#626161] text-[0.9375rem] leading-relaxed">
                            <p>Our core principles are transparency and fairness. We don&apos;t hide behind a big corporate office thousands of miles away, we are right with you on the ground helping you to make your sale.</p>
                            <p>We strive to become your reliable partner in dealing with your used car as our mission is to provide confidence to any person that wants to sell any car in UAE.</p>
                            <p>Our processes are clear and they never differentiate from what we say. You can expect the same 5★ treatment every time from us. It doesn&apos;t matter if you are selling us a brand-new Porsche or a beaten-up car that has seen better days, providing out of this world service to every client is what we do.</p>
                            <p>There are no sneaky tricks, unforeseen costs or blackhat tactics if you trust us to sell used car in UAE with us. Once we have carried out our professional inspection, we offer you a fair price based on what we find and in line with the market.</p>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                            I Want to Sell My Car in UAE While Avoiding the Lowball Bidders and Tyre Kickers.{' '}
                            <span className="text-[#f24026]">Perfect, You Are in The Right Place for That!</span>
                        </h2>
                        <div className="space-y-3 text-[#626161] text-[0.9375rem] leading-relaxed">
                            <p>Everyone is familiar with the sly tactics of lowball bidders in the car market. They are a universal pain for everyone involved.</p>
                            <p>Here at expat car buyers, we have a 0-tolerance policy for low ball offers in our culture. You simply will not find them here.</p>
                            <p>In all our years in this business, and we have been around for a while now, we have never made an offer to a client that has not been reasonable and fair. And we never will.</p>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                            But What If I Want to Sell My Car Online{' '}
                            <span className="text-[#f24026]">But It Has Seen Better Days?</span>
                        </h2>
                        <div className="space-y-3 text-[#626161] text-[0.9375rem] leading-relaxed">
                            <p>Absolutely, no problem. It does not matter if your car has just rolled off the production line and you can still see your reflection in the fresh paint or it has done 10 laps of the globe and has a door missing.</p>
                            <p>There is no better way to get the right amount of money for your car with the least amount of headache possible to sell car in UAE with Expat Car Buyers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SATISFACTION GUARANTEE
            ══════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
                        <div className="flex-1 wow fadeInLeft">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Your satisfaction is our business
                            </h3>
                            <p className="text-[#626161] mb-2 leading-relaxed">
                                We guarantee that when you sell any car with us, you will be 100% satisfied with our service. We cut no corners, are always upfront and go the extra mile for our clients. Every. Single. Time.
                            </p>
                            <p className="text-[#f24026] font-bold mb-5">
                                Here is what you can expect when you come to the best place to sell car in UAE:
                            </p>
                            <ul className="guarantee-list">
                                {guaranteeItems.map(item => (
                                    <li key={item}>
                                        <CheckIcon />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 text-center wow fadeInRight">
                            <img
                                src="/front/images/Illustration-red.png"
                                alt="Sell my car UAE"
                                className="max-w-xs md:max-w-sm w-full mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                WHAT MAKES US BEST — full-width split
            ══════════════════════════════════════════════ */}
            <section className="text-image-section">
                <div className="text-image-inner">
                    <div className="text-image-text">
                        <h2 className="text-2xl md:text-3xl font-bold">What makes us the best place to sell used car in UAE?</h2>
                        <ul>
                            <li>We strive for excellence in every single aspect of our business. And it shows in the service we are able to provide to our clients. When selling your car in UAE, there are a mountain of reasons to sell with us.</li>
                            <li>We will never be beaten on price. You can take your car to every dealership in the country but we can guarantee that none will be able to offer you as much cash as we will.</li>
                            <li>We do all the heavy lifting for you. No paperwork. No admin. No burned hours dealing with time wasters. Just sit back and let us take care of everything while you simply get paid the most money possible for your car.</li>
                            <li>Our inspection process is totally free of charge. Bring your car in for inspection and decide not to sell to us? That is absolutely fine. All of our inspections are carried out at our cost totally free of charge to our clients.</li>
                            <li>No pushing to make the sale. Unlike many other dealers we will never try to push or manipulate to sell to us. The choice is completely yours.</li>
                            <li>Headache free sale. Dealing with private buyers can be a painful process. When selling with us, there is none of this nonsense. We take all the stress out of the process and make it 100% stress free to sell your car in UAE.</li>
                        </ul>
                    </div>
                    <div
                        className="text-image-img"
                        style={{ backgroundImage: "url('/front/images/pngwing.webp')" }}
                    />
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10">
                        Our Happy <span className="text-[#f24026]">Customers</span>
                    </h2>
                    <TestimonialCarousel />
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                WHY PEOPLE TRUST US
            ══════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-12">
                        Why people <span className="text-[#f24026]">trust us?</span>
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {trustFeatures.map((f, i) => (
                            <div
                                key={f.title}
                                className="trust-badge wow fadeInUp"
                                data-wow-delay={`${i * 0.1}s`}
                            >
                                <img src={f.icon} alt={f.title} width={60} className="mx-auto mb-4" />
                                <h5 className="font-bold text-gray-900 text-base mb-2">{f.title}</h5>
                                <p className="text-sm text-[#626161] leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                WE ARE THE MOST TRUSTED — full-width split
            ══════════════════════════════════════════════ */}
            <section className="text-image-section">
                <div className="text-image-inner">
                    <div className="text-image-text">
                        <h3 className="text-2xl md:text-3xl font-bold">We are one of the most trusted dealers in the UAE for good reason</h3>
                        <p><strong>Cost free valuation:</strong> We take the cost of the valuation of your car as our own expense. This means that you can come in and find out the true value of your car for 0 exchange of money. And don&apos;t worry, unlike some other companies, we will never try to guilt trip or force you into selling your car to us post inspection.</p>
                        <p><strong>Professionally Authorized:</strong> The RTA has officially recognised and authorized us to handle ownership transfer. This means that you do not have to give a second thought to dealing with this tricky and long-winded process yourself. Our in-house professionals will make the transfer for you totally stress free.</p>
                        <p><strong>Settlement of outstanding finance:</strong> You may be wanting to sell used car in UAE but have outstanding finance agreements on it. This may be a problem for some dealers, but for us it is absolutely not. Simply bring your car in, we will settle the outstanding amount of finance and we will even pay you the difference!</p>
                        <p><strong>Instant payment:</strong> When you sell your car with us, we aim to make sure that you get your money within just 30 minutes of the sale. If this is cash in hand, bank transfer or cheque we can do them all, whatever works best for you!</p>
                    </div>
                    <div
                        className="text-image-img"
                        style={{ backgroundImage: "url('/front/images/PngItem_51223121.webp')" }}
                    />
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                FAQ
            ══════════════════════════════════════════════ */}
            <section className="py-16 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10">
                        Frequently <span className="text-[#f24026]">Asked Questions</span>
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <FAQAccordion />
                    </div>
                </div>
            </section>
        </>
    );
}
