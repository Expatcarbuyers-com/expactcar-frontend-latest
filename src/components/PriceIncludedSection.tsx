import React from 'react';

type PriceIncludedSectionProps = {
  variant?: 'default' | 'abuDhabi' | 'weBuyAnyCar';
};

const defaultItems = [
  { name: 'Paper checking', originalPrice: null },
  { name: 'Car inspection', originalPrice: null },
  { name: 'Consultant fee', originalPrice: null },
];

const customContent = {
  abuDhabi: {
    heading: 'What\'s Included, Free',
    items: ['Document verification', 'Full vehicle inspection', 'Advisory consultation'],
    footer: 'No charge for any of it — ever.',
  },
  weBuyAnyCar: {
    heading: 'Included at No Extra Cost',
    items: ['Paperwork review', 'Professional inspection', 'Expert valuation advice'],
    footer: 'All free, whether you sell to us or not.',
  },
} as const;

const PriceIncludedSection: React.FC<PriceIncludedSectionProps> = ({ variant = 'default' }) => {
  const isDefault = variant === 'default';
  const selectedContent = isDefault ? null : customContent[variant];
  const items = isDefault ? defaultItems : selectedContent!.items;
  const heading = isDefault ? 'Price Included' : selectedContent!.heading;
  const footer = isDefault ? "we're offering all this for FREE" : selectedContent!.footer;

  return (
    <section className="py-16 bg-[#f24026] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{heading}</h2>

        <div className={isDefault ? 'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto' : 'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'}>
          {items.map((item, index) => {
            const label = typeof item === 'string' ? item : item.name;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center justify-between transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.9992 0C13.1745 2.79518e-08 15.3009 0.645124 17.1096 1.85364C18.9184 3.06217 20.3283 4.7798 21.1609 6.78952C21.9934 8.79925 22.2113 11.0107 21.787 13.1443C21.3627 15.2778 20.3154 17.2377 18.7773 18.776C17.2392 20.3143 15.2795 21.362 13.146 21.7866C11.0125 22.2112 8.8011 21.9937 6.79125 21.1615C4.78139 20.3293 3.06332 18.9197 1.85451 17.1111C0.645695 15.3026 0.000348725 13.1762 0 11.0009C0.000934457 8.08388 1.16009 5.28646 3.22257 3.22365C5.28505 1.16083 8.08216 0.00140204 10.9992 0ZM10.9992 1.83384C9.18575 1.83384 7.41292 2.37156 5.9051 3.37905C4.39729 4.38654 3.22218 5.8184 2.52821 7.49379C1.83424 9.16918 1.65268 11.0129 2.00647 12.7915C2.36025 14.5701 3.23344 16.2038 4.51573 17.4861C5.79802 18.7684 7.43174 19.6416 9.21033 19.9953C10.9889 20.3491 12.8324 20.1676 14.5078 19.4736C16.1832 18.7796 17.6153 17.6043 18.6228 16.0965C19.6303 14.5887 20.168 12.8161 20.168 11.0026C20.168 9.79855 19.9307 8.60621 19.4699 7.49379C19.0092 6.38137 18.3338 5.37058 17.4824 4.51917C16.631 3.66777 15.6202 2.99243 14.5078 2.53165C13.3954 2.07087 12.2033 1.83384 10.9992 1.83384ZM9.6238 12.9122L14.8871 7.63477C15.0463 7.46284 15.2654 7.35842 15.4992 7.34291C15.733 7.32739 15.9637 7.40208 16.1443 7.55147C16.3248 7.70087 16.4414 7.91359 16.4699 8.14618C16.4984 8.37877 16.4368 8.61344 16.2977 8.80202L16.1901 8.93073L10.2816 14.8535C10.1298 15.0063 9.92889 15.1008 9.71442 15.1202C9.49995 15.1395 9.2856 15.0825 9.10895 14.9594L8.98024 14.8589L5.77101 11.6499C5.60189 11.4755 5.50734 11.2421 5.50734 10.9992C5.50734 10.7563 5.60189 10.5229 5.77101 10.3485C5.92396 10.1975 6.12507 10.1047 6.33924 10.0864C6.55342 10.068 6.76721 10.1252 6.94364 10.248L7.07235 10.3485L9.62918 12.9105L14.8924 7.63305L9.6238 12.9122Z"
                        fill="#f24026"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">{label}</span>
                </div>
                {!isDefault && typeof item === 'object' && item.originalPrice && (
                  <del className="text-white/60 text-sm font-medium">{item.originalPrice}</del>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <h5 className="text-xl md:text-2xl mb-8">
            {isDefault ? (
              <>
                we&apos;re offering all this for <span className="font-bold underline decoration-4 underline-offset-8">FREE</span>
              </>
            ) : (
              <>{footer}</>
            )}
          </h5>
          {isDefault && (
            <a
              href="#"
              className="inline-block bg-white text-[#f24026] hover:bg-white/90 font-bold px-10 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Sell My Car
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceIncludedSection;
