import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="relative flex w-full flex-col gap-6 overflow-hidden text-white">
      {/* 🌌 STAR BACKGROUND */}
      {/* HERO SECTION */}
      <section className="relative z-10 border-y border-zinc-800 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
              Articles
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Explore stories from across the universe
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
              Browse featured articles about React concepts presented through a cosmic-inspired
              interface with reusable cards and clean navigation.
            </p>

            <div className="mt-6">
              <Button
                to="/"
                className="border-violet-600 bg-violet-600 text-white hover:bg-violet-500"
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
      <section className="relative z-10 border-y border-zinc-800 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Universe article grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
