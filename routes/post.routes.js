const express = require('express')
const router = express.Router();
const {getAllPublicPosts, createPost, getPostByUserId, updatePost, deletePostById, getAllPosts} = require('../controllers/post.controller')

router.get('/',getAllPublicPosts)

router.get('/private', getAllPosts);

router.get('/read/:userId',getPostByUserId)

router.post('/create',createPost)

router.put('/update/:postId',updatePost)

router.delete('/delete/:postId',deletePostById)



module.exports = router;