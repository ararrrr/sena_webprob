import Button from '../components/Button.jsx';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-950 text-white">

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
      
      {/* HERO SECTION */}
      <section className="border-y border-zinc-800 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
              Articles
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Discover stories beyond Earth
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
              Explore fascinating topics about stars, planets, galaxies, and black holes
              through simple article-style cards inspired by the wonders of the universe.
            </p>

            <div className="mt-6">
              <Button
                to="/"
                className="bg-violet-600 text-white border-violet-600 hover:bg-violet-500"
              >
                Back Home
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://external-preview.redd.it/the-most-awesome-photo-of-the-milky-way-ive-seen-yet-v0-oluRUXCVMJCCK2Qyg_atG7_MoK5OZF6cKNS6huFsvDQ.jpg?auto=webp&s=ade1e71b9941b2c32ab8222ac3267039f75c4d2d"
              alt="Universe"
              className="h-[300px] w-full rounded-2xl object-cover brightness-75"
            />
          </div>

        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Universe article grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* CARD 1 */}
          <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://cdn.mos.cms.futurecdn.net/BfemybeKVXCf9pgX9WCxsc-1200-80.jpg"
              alt="Stars"
              className="h-44 w-full rounded-2xl object-cover brightness-75"
            />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              The life cycle of a star
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Stars are born in giant clouds of gas and dust, shine for millions of years,
              and eventually fade or explode depending on their size.
            </p>

            <Button className="mt-4 border-zinc-500 text-zinc-300 hover:bg-zinc-800">
              Read More
            </Button>
          </article>

          {/* CARD 2 */}
          <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://images.pexels.com/photos/12990385/pexels-photo-12990385.png"
              alt="Planets"
              className="h-44 w-full rounded-2xl object-cover brightness-75"
            />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Why planets are unique
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Planets come in different sizes, temperatures, and compositions, making each
              one a unique world with its own environment.
            </p>

            <Button className="mt-4 border-zinc-500 text-zinc-300 hover:bg-zinc-800">
              Read More
            </Button>
          </article>

          {/* CARD 3 */}
          <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_%28NASA-med%29.jpg"
              alt="Galaxy"
              className="h-44 w-full rounded-2xl object-cover brightness-75"
            />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Understanding galaxies
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Galaxies are enormous systems made up of stars, planets, dust, gas, and dark
              matter, all connected by gravity.
            </p>

            <Button className="mt-4 border-zinc-500 text-zinc-300 hover:bg-zinc-800">
              Read More
            </Button>
          </article>

          {/* CARD 4 */}
          <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://4kwallpapers.com/images/wallpapers/gargantua-black-2048x2048-9659.jpg"
              alt="Black Hole"
              className="h-44 w-full rounded-2xl object-cover brightness-75"
            />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              The mystery of black holes
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Black holes are regions in space with gravity so strong that even light cannot
              escape from them.
            </p>

            <Button className="mt-4 border-zinc-500 text-zinc-300 hover:bg-zinc-800">
              Read More
            </Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;