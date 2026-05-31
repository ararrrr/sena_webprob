const express = require('express');
const {
  getArticles,
  getPublicArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.get('/public', getPublicArticles);
router.route('/:idOrName').get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
