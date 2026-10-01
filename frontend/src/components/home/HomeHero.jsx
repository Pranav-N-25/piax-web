import React from 'react';

import heroModel from './assets/hero_model.png';
import avatarDiya from '../../assets/reviews/avatars/avatar_1.jpg';
import avatarAishwarya from '../../assets/reviews/avatars/avatar_2.jpg';
import avatarMeera from '../../assets/reviews/avatars/avatar_3.jpg';
import avatarSahana from '../../assets/reviews/avatars/avatar_4.jpg';
import { Link } from 'react-router-dom';
import { Foliage } from './HomeUi.jsx';
import { cn, container } from './homeStyles.js';

// Vite/CRA return a string for image imports; Next.js returns { src, width, height }.
const src = (img) => (typeof img === 'string' ? img : img?.src);

/* ── Icons ── */
const Svg = ({ size = 20, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
    {...rest}
  >
    {children}
  </svg>
);

const CartBagIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Svg>
);

const SparkleIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </Svg>
);

const CottonIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M11 13a3 3 0 0 0 3-3" />
  </Svg>
);

const ShieldCheckIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

const TruckIcon = ({ size }) => (
  <Svg size={size}>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </Svg>
);

const DropletIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </Svg>
);

const Stars = ({ count = 5, size = 13 }) => (
  <span className="inline-flex items-center gap-0.5 align-middle" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }, (_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </span>
);

/* ── Shared class strings ── */
const chip =
  'absolute z-[4] flex items-center gap-3 rounded-2xl border border-white/95 bg-white/[0.86] py-3 pl-3 pr-4 ' +
  'backdrop-blur-[14px] shadow-[0_14px_34px_-8px_rgba(5,38,32,0.25)] animate-[heroFloatChipY_7s_ease-in-out_infinite] ' +
  'motion-reduce:animate-none max-[600px]:py-2 max-[600px]:pl-2 max-[600px]:pr-3';
const chipIcon =
  'flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-white max-[600px]:h-7 max-[600px]:w-7';
const chipTitle = 'block text-[12.5px] [font-weight:750] leading-[1.25] text-[#052620] max-[600px]:text-[11.5px]';
const chipSub = 'block text-[11px] leading-[1.25] text-[#738a85] max-[600px]:text-[10px]';

const btnBase =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-[15px] no-underline ' +
  'transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 active:scale-[0.97] ' +
  'max-[600px]:w-full';

const avatars = [
  { img: avatarDiya, name: 'Diya' },
  { img: avatarAishwarya, name: 'Aishwarya' },
  { img: avatarMeera, name: 'Meera' },
  { img: avatarSahana, name: 'Sahana' },
];

export default function HomeHero() {
  return (
    <section
      className={
        'relative z-[1] isolate flex min-h-[max(560px,calc(100svh-4rem))] items-center overflow-hidden ' +
        'py-12 lg:py-15 text-[#0c1c19] ' +
        "[font-family:'Poppins',-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif] " +
        'bg-[linear-gradient(120deg,#e3f4ef_0%,#d3ece5_48%,#bfe3d9_100%)] ' +
        // Stacked on mobile: start on the colour the photo fades into, ease down to the page colour.
        'max-[960px]:bg-[linear-gradient(180deg,#d3ece5_0%,#d8eee7_30%,#e3f3ec_62%,var(--color-mist)_100%)] ' +
        'max-[960px]:block max-[960px]:min-h-0 max-[960px]:pt-0 max-[960px]:pb-12 max-[640px]:pb-10'
      }
    >
      <style>{`
        @keyframes heroFloatChipY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Soft emerald glow, bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[220px] -left-[160px] z-0 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(0,135,116,0.14)_0%,transparent_70%)]"
      />


      {/* Botanical frame: a cluster anchoring the bottom-left corner and a light twig at the top-right,
          both cropped by the viewport edge and kept clear of the headline. */}
      <Foliage art="clusterLeft" className="-bottom-[70px] -left-[90px] z-[1] w-[clamp(240px,24vw,380px)] opacity-90 max-[1024px]:hidden" />
      <Foliage art="twigRight" className="top-2 -right-6 z-[1] w-[clamp(80px,9vw,140px)] rotate-[18deg] opacity-60 max-[960px]:hidden" />

      {/* Full-bleed model photo: covers the right half on desktop, the top band on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-0 w-[58%] overflow-hidden max-[960px]:relative max-[960px]:inset-auto max-[960px]:h-[clamp(340px,62vw,520px)] max-[960px]:w-full max-[600px]:h-[360px]"
      >
        <img
          src={src(heroModel)}
          alt=""
          fetchPriority="high"
          className="block h-full w-full object-cover object-[58%_22%] [filter:saturate(0.92)_hue-rotate(-8deg)_brightness(1.03)] max-[960px]:object-[55%_24%] max-[600px]:object-[56%_20%]"
        />
        <div
          className={
            'pointer-events-none absolute inset-0 ' +
            'bg-[linear-gradient(90deg,#d3ece5_0%,rgba(211,236,229,0.85)_14%,rgba(211,236,229,0.25)_34%,transparent_52%),linear-gradient(0deg,rgba(211,236,229,0.55)_0%,transparent_22%),linear-gradient(135deg,rgba(0,135,116,0.10),rgba(0,135,116,0.04))] ' +
            'max-[960px]:bg-[linear-gradient(0deg,#d3ece5_0%,rgba(211,236,229,0.92)_8%,rgba(211,236,229,0.6)_20%,rgba(211,236,229,0.25)_34%,transparent_48%),linear-gradient(135deg,rgba(0,135,116,0.08),rgba(0,135,116,0.03))]'
          }
        />
      </div>

      {/* Bottom fade into the page background, so the hero melts into the next section with no hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[clamp(140px,24vh,280px)] bg-[linear-gradient(180deg,rgba(238,247,242,0)_0%,rgba(238,247,242,0.18)_25%,rgba(238,247,242,0.5)_50%,rgba(238,247,242,0.82)_75%,var(--color-mist)_100%)] max-[960px]:h-24"
      />

      <div className={cn(container, 'relative z-[2] max-[960px]:pt-7 max-[640px]:pt-6')}>
        <div className="grid grid-cols-2 items-center gap-16 max-[1024px]:grid-cols-1 max-[1024px]:gap-10 max-[1024px]:text-center">
          {/* Left: Copy */}
          <div data-hero-copy className="flex flex-col items-start max-[1024px]:mx-auto max-[1024px]:max-w-[620px] max-[1024px]:items-center max-[960px]:order-1 max-[768px]:w-full">
            <h1 className="mb-4 [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Plus_Jakarta_Sans','Poppins',sans-serif] text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#052620] max-[768px]:w-full max-[768px]:text-center max-[640px]:text-[clamp(28px,8vw,36px)] max-[640px]:leading-[1.15] max-[375px]:text-[27px] max-[330px]:text-2xl">
              <span className="block">Your period, understood.</span>
              <span className="block text-[#008774]">Your care, delivered.</span>
            </h1>

            <p className="mb-8 max-w-[500px] text-[clamp(15px,1.35vw,17px)] leading-[1.65] text-[#415551] max-[960px]:mx-auto max-[768px]:max-w-[520px] max-[768px]:text-center max-[640px]:mb-6 max-[640px]:text-[14.5px] max-[640px]:leading-[1.6]">
              Comfort-focused pads in four sizes, with a soft top sheet and an anion-infused design — plus the PIAX app to track your cycle. Find your size, track your period and get pads delivered.
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4 max-[1024px]:justify-center max-[640px]:mx-auto max-[640px]:w-full max-[640px]:max-w-[320px] max-[640px]:flex-col max-[640px]:gap-3 max-[375px]:max-w-[290px]">
              <a
                href="#shop-products"
                className={`${btnBase} gap-2.5 border-none bg-[#052620] duration-300 min-h-12 px-6 py-3 font-bold text-white shadow-[0_8px_24px_-4px_rgba(5,38,32,0.3)] hover:bg-[#0a3f36] hover:shadow-[0_12px_28px_-4px_rgba(5,38,32,0.4)]`}
              >
                <CartBagIcon size={17} />
                Shop Now
              </a>
              <Link
                to="/find-my-pad"
                className={`${btnBase} gap-2 border-[1.5px] border-[rgba(10,63,54,0.14)] bg-white min-h-12 px-6 py-3 font-semibold text-[#052620] shadow-[0_2px_8px_rgba(0,0,0,0.03),0_1px_2px_rgba(5,38,32,0.02)] duration-[250ms] hover:border-[#008774] hover:text-[#008774] hover:shadow-[0_12px_30px_-6px_rgba(5,38,32,0.07),0_4px_12px_rgba(0,0,0,0.03)]`}
              >
                <SparkleIcon size={16} />
                Find My Pad
              </Link>
            </div>

            <ul className="mb-8 flex list-none flex-wrap gap-x-6 gap-y-2 max-[960px]:justify-center max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-2">
              {[
                { Icon: CottonIcon, label: 'Soft top sheet' },
                { Icon: ShieldCheckIcon, label: 'Four sizes, 240–360mm' },
                { Icon: TruckIcon, label: 'Convenient home delivery' },
              ].map(({ Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#10594d]">
                  <span className="text-[#008774]"><Icon size={16} /></span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-[rgba(10,63,54,0.14)] pt-6 max-[1024px]:justify-center max-[768px]:mx-auto max-[768px]:mb-8 max-[768px]:w-full max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:text-center">
              <div className="flex items-center">
                {avatars.map(({ img, name }, i) => (
                  <img
                    key={name}
                    src={src(img)}
                    alt={name}
                    className={`h-9 w-9 rounded-full border-[2.5px] border-white bg-[#f2f9f7] object-cover shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${i === 0 ? '' : '-ml-2.5'}`}
                  />
                ))}
              </div>
              <div className="flex flex-col max-[640px]:items-center max-[640px]:justify-center max-[640px]:text-center max-[640px]:text-[13.5px]">
                <div className="mb-1 leading-none">
                  <Stars size={13} />
                </div>
                <div className="text-[13px] text-[#415551]">
                  <strong className="text-[13px] font-bold text-[#052620]">Rated 4.8/5</strong> by 10,000+ women in India
                </div>
              </div>
            </div>
          </div>

          {/* Right: overlays that sit on top of the full-bleed photo */}
          <div className="relative min-h-[480px] max-[960px]:pointer-events-none max-[960px]:absolute max-[960px]:inset-x-0 max-[960px]:top-[calc(-1*clamp(340px,62vw,520px))] max-[960px]:h-[clamp(340px,62vw,520px)] max-[960px]:min-h-0 max-[600px]:-top-[360px] max-[600px]:h-[360px]">
            {/* Floating info chips */}
            <div className={`${chip} left-[-2%] top-[38%] max-[960px]:left-4 max-[960px]:top-[12%] max-[600px]:left-3 max-[600px]:top-4`}>
              <span className={`${chipIcon} bg-[linear-gradient(135deg,#f08a73,#e87055)]`}>
                <DropletIcon size={18} />
              </span>
              <span className="text-left">
                <strong className={chipTitle}>Next period in 27 days</strong>
                <small className={chipSub}>Cycle tracked in the app</small>
              </span>
            </div>
            <div className={`${chip} bottom-[6%] left-[12%] [animation-delay:1.5s] max-[960px]:hidden`}>
              <span className={`${chipIcon} bg-[linear-gradient(135deg,#008774,#10594d)]`}>
                <SparkleIcon size={18} />
              </span>
              <span className="text-left">
                <strong className={chipTitle}>Made for every woman</strong>
                <small className={chipSub}>Comfort through every cycle</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
