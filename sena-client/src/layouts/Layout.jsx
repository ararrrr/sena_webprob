import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';

const Layout = () => {
  const location = useLocation();

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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
