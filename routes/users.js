var express = require('express');
var router = express.Router();
const UsersController=require('../controllers/usersControllers')

/* GET users listing. */
router.get('/user/friends/:userId',UsersController.friendsList);

router.put('/user/:id/follow',UsersController.followAUser)

router.put('/user/:id/unfollow',UsersController.unFollowAUser)

module.exports = router;
