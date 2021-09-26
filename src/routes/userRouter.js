
const router = require('express').Router();
const UserController = require('../controllers/UserController')
router.post('/login', UserController.login);
//register user
router.post('/register', UserController.register);
module.exports = router;