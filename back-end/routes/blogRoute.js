const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { ensureAuthenticated } = require('../middlewares')

router.post('/', ensureAuthenticated, blogController.createBlog);
router.put('/:id', ensureAuthenticated, blogController.updateBlog);
router.delete('/:id', ensureAuthenticated, blogController.deleteBlog);
router.get('/user', ensureAuthenticated, blogController.getBlogsByAuthenticatedUser);

router.get('/:id', blogController.getBlogById);
router.get('/user/:userId', blogController.getBlogsByUserId);
router.get('/', blogController.getAllBlogs);

module.exports = router
