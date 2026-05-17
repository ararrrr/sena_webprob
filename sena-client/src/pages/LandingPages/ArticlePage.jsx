import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { getPublicArticles } from '../../services/ArticleService';

function ArticlePage() {
  const { name } = useParams();
  const articles = getPublicArticles();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y border-zinc-800 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-white">Article not found</h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y border-zinc-800 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Article
          </p>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            {article.name
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img
            src={article.image}
            alt={article.title}
            className="mb-8 aspect-4/3 w-full rounded-[1.25rem] border border-white/10 object-cover"
          />

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-300">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-7 text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
