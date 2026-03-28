import Button from '../components/Button.jsx';

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">

      {/* 🌌 STAR BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(1.5px 1.5px at 50px 80px, #a78bfa, transparent),
              radial-gradient(2px 2px at 120px 40px, white, transparent),
              radial-gradient(1.5px 1.5px at 180px 120px, #60a5fa, transparent),
              radial-gradient(2px 2px at 250px 90px, white, transparent),
              radial-gradient(1.5px 1.5px at 300px 150px, #c4b5fd, transparent)
            `,
            backgroundSize: '300px 150px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* 🌌 CONTENT */}
      <div className="relative z-10 flex w-full flex-col gap-6">
        
        <section className="border-y border-zinc-800 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                Home
              </p>

              <h1 className="max-w-xl text-3xl font-bold sm:text-4xl">
                Explore the Universe
              </h1>

              <p className="mt-4 max-w-lg text-sm text-zinc-300">
                The universe is filled with mystery, beauty, and endless discoveries.
                From stars and planets to galaxies and black holes, space continues to
                inspire curiosity and wonder.
              </p>

              <div className="mt-6 flex gap-3">
                <Button to="/about">Learn More</Button>
                <Button to="/articles">View Articles</Button>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
              <img
                src="https://images.wallpaperscraft.com/image/single/universe_milky_way_galaxy_171733_3840x2400.jpg"
                alt="Universe Hero"
                className="h-[280px] w-full rounded-2xl object-cover brightness-75"
              />
            </div>

          </div>
        </section>

        <section className="border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-violet-300">
              Quick Facts
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Facts About the Universe
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
              <p className="text-2xl font-bold">13.8B</p>
              <p className="text-xs text-zinc-400">Years Old</p>
            </div>

            <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
              <p className="text-2xl font-bold">100B+</p>
              <p className="text-xs text-zinc-400">Galaxies</p>
            </div>

            <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
              <p className="text-2xl font-bold">200B+</p>
              <p className="text-xs text-zinc-400">Planets</p>
            </div>

            <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
              <p className="text-2xl font-bold">∞</p>
              <p className="text-xs text-zinc-400">Mysteries</p>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-violet-300">
              Cosmic Wonders
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Explore Space
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
              <img
                src="https://i.pinimg.com/1200x/c0/6a/dc/c06adc14a2d794c756ec9f4d40a8a625.jpg"
                alt="Stars"
                className="h-40 w-full rounded-2xl object-cover brightness-75"
              />
              <h3 className="mt-4 text-lg font-semibold">Stars</h3>
              <p className="text-sm text-zinc-300">
                Stars are giant glowing spheres of gas that produce light and heat.
              </p>
            </article>

            <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
              <img
                src="https://i.pinimg.com/736x/fd/41/8a/fd418a758abc60cdfba6c915aa704352.jpg"
                alt="Planets"
                className="h-40 w-full rounded-2xl object-cover brightness-75"
              />
              <h3 className="mt-4 text-lg font-semibold">Planets</h3>
              <p className="text-sm text-zinc-300">
                Planets orbit stars and come in many sizes and forms.
              </p>
            </article>

            <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
              <img
                src="https://i.pinimg.com/736x/bf/cb/4d/bfcb4dad21d66f4c068d3ba4f5548e7e.jpg"
                alt="Galaxy"
                className="h-40 w-full rounded-2xl object-cover brightness-75"
              />
              <h3 className="mt-4 text-lg font-semibold">Galaxies</h3>
              <p className="text-sm text-zinc-300">
                Galaxies are massive systems of stars, dust, gas, and dark matter.
              </p>
            </article>

          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;