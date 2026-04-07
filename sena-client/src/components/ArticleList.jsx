import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-4 transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          {/* IMAGE */}
          <img
            src={article.image}
            alt={article.title}
            className="aspect-4/3 w-full rounded-[1.25rem] object-cover transition duration-500 hover:scale-105"
          />

          {/* NUMBER */}
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article {String(index + 1).padStart(2, '0')}
          </p>

          {/* TITLE */}
          <h3 className="mt-2 text-lg font-semibold text-white">
            {article.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {article.content[0].substring(0, 120)}...
          </p>

          {/* BUTTON */}
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;