const Article = require('../models/Article');

const toSlug = (value = '') =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const normalizeArticlePayload = (body, fallback = {}) => {
  const rawContent = hasOwn(body, 'content') ? body.content : fallback.content;
  const content = Array.isArray(rawContent)
    ? rawContent
    : String(rawContent || '')
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

  const payload = {
    name: toSlug(body.name || body.title || fallback.name || fallback.title),
    title: hasOwn(body, 'title') ? body.title : fallback.title,
    image: hasOwn(body, 'image') ? body.image : fallback.image,
    content,
  };

  if (hasOwn(body, 'isActive')) {
    payload.isActive = body.isActive;
  } else if (hasOwn(fallback, 'isActive')) {
    payload.isActive = fallback.isActive;
  }

  return payload;
};

const findArticleByIdOrName = (idOrName) => {
  if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
    return Article.findById(idOrName);
  }

  return Article.findOne({ name: idOrName.toLowerCase() });
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticle = async (req, res) => {
  try {
    const article = await findArticleByIdOrName(req.params.idOrName);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(normalizeArticlePayload(req.body));
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await findArticleByIdOrName(req.params.idOrName);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    Object.assign(article, normalizeArticlePayload(req.body, article.toObject()));
    const updatedArticle = await article.save();

    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await findArticleByIdOrName(req.params.idOrName);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getPublicArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
