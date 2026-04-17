import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function NotFoundPage() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative z-10 w-full max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400">
          Page Not Found
        </p>

        <h1 className="mt-6 text-6xl font-bold leading-none text-white sm:text-7xl md:text-8xl">
          404
        </h1>

        <div className="mx-auto mt-6 h-px w-44 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

        <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">
          You drifted beyond our mapped universe.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
          The page you are looking for is not here, but there are still plenty of stars to explore.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" className="border-zinc-100 bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
            Return Home
          </Button>
          <Link
            to="/articles"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Browse Articles
          </Link>
        </div>

      </div>
    </section>
  );
}

export default NotFoundPage;
