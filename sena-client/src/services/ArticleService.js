import seedArticles from '../assets/article-content.js';

const STORAGE_KEY = 'senaUniverseArticles';

const normalizeArticle = (article, index = 0) => ({
  id: article.id || article.name || `article-${index + 1}`,
  name: article.name || `article-${index + 1}`,
  title: article.title || 'Untitled Article',
  image: article.image || '',
  content: Array.isArray(article.content) ? article.content : [],
  isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
});

const isUsableArticle = (article) =>
  Boolean(article?.name && article?.title && Array.isArray(article.content) && article.content.length);

export const getArticles = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const articles = JSON.parse(stored).map(normalizeArticle).filter(isUsableArticle);
      if (articles.length) return articles;
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const articles = seedArticles.map(normalizeArticle).filter(isUsableArticle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  return articles;
};

export const saveArticles = (articles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles.map(normalizeArticle).filter(isUsableArticle)));
};

export const getPublicArticles = () => getArticles().filter((article) => article.isActive);
