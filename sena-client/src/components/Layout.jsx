import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import logo from '../assets/logo.png';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const footerNotes = [
  'Stargazing stories, cosmic facts, and beautiful discoveries.',
  'Built for curious minds who want to explore beyond the horizon.',
];

const Layout = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Space Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-zinc-950" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.95), transparent),
              radial-gradient(1.5px 1.5px at 50px 80px, rgba(148,163,184,0.7), transparent),
              radial-gradient(2px 2px at 120px 40px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1.5px 1.5px at 180px 120px, rgba(96,165,250,0.45), transparent),
              radial-gradient(2px 2px at 250px 90px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1.5px 1.5px at 300px 150px, rgba(186,230,253,0.35), transparent)
            `,
            backgroundSize: '320px 220px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 30px 50px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 20px, rgba(255,255,255,0.55), transparent),
              radial-gradient(1px 1px at 160px 110px, rgba(96,165,250,0.35), transparent),
              radial-gradient(1px 1px at 240px 70px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 340px 140px, rgba(255,255,255,0.45), transparent)
            `,
            backgroundSize: '380px 240px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        <main className="pb-16 pt-24">
          <Outlet />
        </main>
        <footer className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-18">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  radial-gradient(2px 2px at 24px 30px, rgba(255,255,255,0.95), transparent),
                  radial-gradient(1.5px 1.5px at 120px 90px, rgba(245,245,244,0.7), transparent),
                  radial-gradient(2px 2px at 220px 70px, rgba(251,191,36,0.35), transparent),
                  radial-gradient(1.5px 1.5px at 340px 120px, rgba(255,255,255,0.7), transparent)
                `,
                backgroundSize: '360px 180px',
                backgroundRepeat: 'repeat',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
            <div className="mb-7 h-px w-full bg-white/6" />
            <div className="grid gap-6 border-b border-zinc-800 pb-6 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.65fr_0.7fr] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                  Cosmic Journal
                </p>
                <h2 className="mt-2 max-w-sm text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Explore farther than the last page.
                </h2>
                <div className="mt-3 h-px w-24 bg-zinc-700" />
                <div className="mt-4 space-y-2 text-sm leading-6 text-zinc-300">
                  {footerNotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                  Site Map
                </p>
                <nav className="mt-3 space-y-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block text-sm text-zinc-300 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex items-center justify-center lg:justify-start">
                <img
                  src={logo}
                  alt="Universe logo"
                  className="h-32 w-auto -translate-x-6 object-contain sm:h-36 lg:-translate-x-10"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 pt-6 text-center">
              <p className="text-xs text-zinc-500">Copyright {currentYear} Cosmic Journal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
