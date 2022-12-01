const express=require('express')
const router=express.Router()
const PostsController=require('../controllers/postsController')
const { route } = require('./users')


router.get('/post',PostsController.getAllPost)

router.post('/post',PostsController.createPost)
router.put('/post/:id',PostsController.updatePost)

router.delete('/post/:id',PostsController.deletePost)

router.get('/post/:id/like',PostsController.likeAPost)

router.get('/post/:id',PostsController.getSinglePost) 

router.get('/timeline/:id',PostsController.getTimelinePost) 

router.get('/profile/:username',PostsController.getProfilePost) 


module.exports=router
