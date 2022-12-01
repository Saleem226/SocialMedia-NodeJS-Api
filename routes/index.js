var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
const authRouter=require('./auth')
const postsRouter=require('./posts')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.locals)
  res.render('index', { title: 'Express' });
});

router.use(authRouter)
router.use(postsRouter)
router.use('/users', usersRouter);


module.exports = router;