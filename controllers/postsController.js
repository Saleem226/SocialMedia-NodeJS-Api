const Post = require('../modals/Post')
const User = require('../modals/User')

class PostsController {
    //create new post
    static createPost = async (req, res) => {
        try {
            const newPost = new Post(req.body)
            const savedPost = await newPost.save()

            res.status(200).json({
                message: "Post Created Successfully",
                data: savedPost
            })
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to update a post
    static updatePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body }, { new: true });

                res.status(200).json({
                    message: "Post Ipdated Successfully",
                    data: post
                })
            } else {
                res.status(200).json("You can only Delete your posts")
            }

        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to delete a post
    static deletePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (post.userId === req.body.userId) {
                await post.deleteOne();

                res.status(200).json({
                    message: "Post Deleted Successfully",
                })
            } else {
                res.status(200).json("You can only delete your posts")
            }

        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to get all posts
    static getAllPost = async (req, res) => {
        try {
            const post = await Post.find()
            res.status(200).send(post)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to like a post
    static likeAPost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } })
                res.status(200).send("you liked this post")
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } })
                res.status(200).send("you disliked this post")
            }

        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to get a post by id
    static getSinglePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.status(200).send(post)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    //to get a post by id
    static getTimelinePost = async (req, res) => {
        try {
            const currentUser = await User.findById(req.params.id)
            const userPost = await Post.find({ userId: currentUser._id })
            const friendsPost = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId })
                })
            )
            res.status(200).send(userPost.concat(...friendsPost))
        } catch (error) {
            res.status(400).json(error.message)
        }
    }


    //to get profile posts
    static getProfilePost = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username })
            const post = await Post.find({ userId: user._id })
            res.status(200).send(post)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
}







module.exports = PostsController