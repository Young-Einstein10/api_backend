const express = require('express');
const router = express.Router();
const article = require('../controllers/article');
const auth = require('../middleware/auth');



// router.get('/', auth, article.getAllArticles);
router.post('/', auth, article.postArticles);
router.get('/:id', auth, article.getArticleById);
router.post('/:id/comment',  article.comment);
router.patch('/:id', auth, article.updateArticle);
router.delete('/:id', auth, article.deleteArticle);

module.exports = router;
