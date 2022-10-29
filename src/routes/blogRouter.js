const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blogs', blogController.blogIndex);
router.post('/blogs', blogController.blogCreatePost);
router.get('/blogs/create', blogController.blogCreateGet);
router.get('/blogs/:id', blogController.blogDetails);
router.delete('/blogs/:id', blogController.blogDelete);

module.exports = router;