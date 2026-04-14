import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';

const authImage =
  'https://cdn.wallpapersafari.com/81/1/oY2qdH.jpg';

const AuthLayout = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-zinc-950" />
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.95), transparent),
              radial-gradient(1.5px 1.5px at 90px 80px, rgba(148,163,184,0.7), transparent),
              radial-gradient(2px 2px at 160px 40px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1.5px 1.5px at 250px 130px, rgba(96,165,250,0.45), transparent),
              radial-gradient(2px 2px at 330px 90px, rgba(255,255,255,0.8), transparent)
            `,
            backgroundSize: '360px 220px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="relative z-10 grid min-h-screen w-full lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="flex items-center justify-center border-b border-white/10 px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-16">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center gap-4">
              <img src={logo} alt="Universe Portal logo" className="h-20 w-20 object-contain" />
              <div>
                <p className="text-base font-bold uppercase tracking-[0.24em] text-white sm:text-lg">
                  Universe Portal
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900/80">
              <img
                src={authImage}
                alt="Deep space view"
                className="h-[22rem] w-full object-cover opacity-80 sm:h-[28rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-300">
                  Beyond The Horizon
                </p>
                <h2 className="mt-3 max-w-md text-3xl font-bold tracking-tight text-white">
                  Keep your place among the stars.
                </h2>
              </div>
            </div>

            <p className="mt-8 max-w-md text-sm leading-6 text-zinc-300">
              Sign in to continue reading space stories, saving favorite articles, and exploring
              the journal.
            </p>
          </div>
        </aside>

        <main className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-[28rem]">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
