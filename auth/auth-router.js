const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secret"); // use this secret!
const bcrypt = require('bcryptjs')
const User = require('../api/models/userModel')
const jwt = require('jsonwebtoken')
const { BCRYPT_ROUNDS } = require('../secret')

router.post("/register", validateRoleName, (req, res, next) => {

  const { username, password } =req.body
  const { role_name } = req
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
  User.add({username, password: hash, role_name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.post("/login", checkUsernameExists, (req, res, next) => {

  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = builderToken(req.user)
    res.json({
      message: `${req.user.username} is back!`,
      token
    })
  } else {
    next ({status: 401, message: 'Invalid credentials'})
  }
});

function builderToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const options = {
    expiresIn: '1d',
  }
  const token = jwt.sign(payload, JWT_SECRET, options)

  return token
}


module.exports = router;
