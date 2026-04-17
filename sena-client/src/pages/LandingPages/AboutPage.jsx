import Button from '../../components/Button.jsx';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 text-white">

            {/* 🌌 STAR BACKGROUND */}
      {/* HERO SECTION */}
      <section className="border-y border-zinc-800 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-4">
            <img
              src="https://wallpapers.com/images/hd/milky-way-with-billions-of-stars-pqj5nfyx8fkvc9j0.jpg"
              alt="Universe"
              className="h-[300px] w-full rounded-2xl object-cover brightness-75"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
              About Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Discover the story of the universe
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
              The universe is everything that exists — stars, planets, galaxies, matter,
              energy, and the space between them. It is vast, mysterious, and still full
              of questions that scientists continue to explore.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" className="bg-violet-600 text-white border-violet-600 hover:bg-violet-500">
                Back Home
              </Button>
              <Button to="/articles" className="border-zinc-500 text-zinc-200 hover:bg-zinc-800">
                Open Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            Universe Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Key ideas about the cosmos
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
            <p className="text-2xl font-bold text-white">13.8B</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Years
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
            <p className="text-2xl font-bold text-white">100B+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Galaxies
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
            <p className="text-2xl font-bold text-white">∞</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Mystery
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
            <p className="text-2xl font-bold text-white">1</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Universe
            </p>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
              Cosmic Knowledge
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Main parts of the universe
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
                <h3 className="text-lg font-semibold text-white">The Big Bang</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Scientists believe the universe began around 13.8 billion years ago
                  in a rapid expansion known as the Big Bang.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
                <h3 className="text-lg font-semibold text-white">Galaxies</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Galaxies are huge collections of stars, planets, dust, gas, and dark matter,
                  all held together by gravity.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
                <h3 className="text-lg font-semibold text-white">Exploration</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Through telescopes, satellites, and space missions, humans continue to
                  explore and learn more about the cosmos.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
              Space View
            </p>

<div className="mt-5 grid gap-4 sm:grid-cols-2">
  
  <img
    src="https://www.nhm.ac.uk/content/dam/nhm-www/discover/what-is-space/what-is-space-milky-way-full-width.jpg"
    alt="Stars"
    className="h-40 w-full rounded-2xl object-cover brightness-75"
  />

  <img
    src="https://heritagetalon.org/wp-content/uploads/2016/11/outerSPACE-900x563.jpg"
    alt="Planet"
    className="h-40 w-full rounded-2xl object-cover brightness-75"
  />

  <img
    src="https://res.cloudinary.com/jerrick/image/upload/v1681028947/643277538b29cf001deec01f.jpg"
    alt="Galaxy"
    className="h-40 w-full rounded-2xl object-cover brightness-75"
  />

  <img
    src="https://cff2.earth.com/uploads/2022/01/15092418/Life-on-Earth-scaled.jpg"
    alt="Universe"
    className="h-40 w-full rounded-2xl object-cover brightness-75"
  />

</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
