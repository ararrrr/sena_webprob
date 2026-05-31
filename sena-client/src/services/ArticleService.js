import axios from 'axios';
import { apiBaseUrl } from './apiBase';

const API = axios.create({
  baseURL: `${apiBaseUrl}/articles`,
});

const normalizeArticle = (article, index = 0) => ({
  id: article.id || article._id || article.name || `article-${index + 1}`,
  name: article.name || `article-${index + 1}`,
  title: article.title || 'Untitled Article',
  image: article.image || '',
  content: Array.isArray(article.content) ? article.content : [],
  isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
});

const isUsableArticle = (article) =>
  Boolean(article?.name && article?.title && Array.isArray(article.content) && article.content.length);

const normalizeArticles = (articles) => articles.map(normalizeArticle).filter(isUsableArticle);

export const getArticles = async () => {
  const { data } = await API.get('/');
  return normalizeArticles(data.articles || []);
};

export const getPublicArticles = async () => {
  const { data } = await API.get('/public');
  return normalizeArticles(data.articles || []);
};

export const getArticle = async (idOrName) => {
  const { data } = await API.get(`/${idOrName}`);
  return normalizeArticle(data);
};

export const createArticle = async (article) => {
  const { data } = await API.post('/', article);
  return normalizeArticle(data);
};

export const updateArticle = async (idOrName, article) => {
  const { data } = await API.put(`/${idOrName}`, article);
  return normalizeArticle(data);
};

export const deleteArticle = (idOrName) => API.delete(`/${idOrName}`);
