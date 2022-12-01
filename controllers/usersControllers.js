const Post = require('../modals/Post')
const User = require('../modals/User')


class UsersController {

    static friendsList = async (req, res) => {
        try {
            const user = await User.findById(req.params.userId)
            const friends = await Promise.all(
                user.followings.map(
                    (fri_id) => {
                        return User.findById(fri_id)
                    })
            )
            let friendsList = []

            friends.map(
                (friend) => {
                    const { _id, username, profilePic } = friend
                    friendsList.push({ _id, username, profilePic })
                }
            )
            res.status(200).json(friendsList)

        } catch (error) {
            res.status(400).json(erro.message)
        }
    }

//follow a user
    static followAUser = async (req, res) => {
        try {
            if (req.body.userId != req.params.id) {

                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.body.userId)

                if (!user.followers.includes(req.body.userId)) {
                    await user.updateOne({
                        $push: { followers: req.body.userId }

                    })
                    await currentUser.updateOne({
                        $push: { followings: req.params.id }
                    })
                    res.status(200).json("User has been followed")
                }else{
                    res.status(200).json("You already Followed this User")
                }
            } else {
                res.status(403).json("you can't follw yourself")
            }

        } catch (error) {
            res.status(400).json(error.message)
        }
    }
//unfollow
    static unFollowAUser = async (req, res) => {
        try {
            if (req.body.userId != req.params.id) {

                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.body.userId)

                if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({
                        $pull: { followers: req.body.userId }

                    })
                    await currentUser.updateOne({
                        $pull: { followings: req.params.id }
                    })
                    res.status(200).json("User has been unfollowed")
                }else{
                    res.status(200).json("You already not Followed this User")
                }
            } else {
                res.status(403).json("you can't follw yourself")
            }

        } catch (error) {
            res.status(400).json(error.message)
        }
    }
}



module.exports = UsersController