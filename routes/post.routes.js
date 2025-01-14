const express = require('express')
const router = express.Router();
const {getAllPosts, createPost, getPostByUserId, updatePost, deletePostById} = require('../controllers/post.controller')

router.get('/',getAllPosts)

router.get('/read/:userId',getPostByUserId)

router.post('/create',createPost)

router.put('/update/:postId',updatePost)

router.delete('/delete/:postId',deletePostById)

module.exports = router;