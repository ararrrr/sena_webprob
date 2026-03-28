import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Star Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(1.5px 1.5px at 50px 80px, #a78bfa, transparent),
              radial-gradient(2px 2px at 120px 40px, white, transparent),
              radial-gradient(1.5px 1.5px at 180px 120px, #60a5fa, transparent),
              radial-gradient(2px 2px at 250px 90px, white, transparent),
              radial-gradient(1.5px 1.5px at 300px 150px, #c4b5fd, transparent)
            `,
            backgroundSize: '300px 200px',
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
      </div>
    </div>
  );
};

export default Layout;