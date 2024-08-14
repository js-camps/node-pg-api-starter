const jwt = require('jsonwebtoken')
const { JWT_SECRET, INSTRUCTOR_SECRET, ADMIN_SECRET } = require("../secret"); // use this secret!
const { findBy } = require('../api/models/userModel')

const restricted = (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header:
    { status: 401, "message": "Token required" }

    If the provided token does not verify:
    { status: 401, message: `Token invalid` }    
  */
    const token = req.headers.authorization
    if (!token) {
      next({ status: 401, message: 'Token required' })
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          next({ status: 401, message: `Token invalid` })
        } else {
          req.decodedJwt = decoded
          next()
        }
      })
    }
}

const only = role_name => (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header with a role_name
    inside its payload matching the role_name passed to this function as its argument:
    {status: 403, message: 'This is not for you'}
    
    Pull the decoded token from the req object, to avoid verifying it again!
  */
    if (role_name === req.decodedJwt.role_name) {
      next()
    } else {
      next({status: 403, message: 'This is not for you'})
    }
}

const checkUsernameExists = async (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    {status: 401, message: 'Invalid credentials'}
  */
    try {
      const [user] = await findBy ({username: req.body.username})
      if(!user) {
        next ({status: 401, message: 'Invalid credentials'})
      } else {
        req.user = user
        next()
      }
    } catch(err) {
      next(err)
    }
}

const validateRoleName = (req, res, next) => {
  
    if (!req.body.role_name || !req.body.role_name.trim()) {
      next({ status: 422, message: "role name required" });
    } else if (req.body.role_name.trim() === 'admin') {
      if (!req.body.auth_code) {
        next({status: 400, message: "admin auth code required"})
      } else if (req.body.auth_code === ADMIN_SECRET) {
        req.role_name = 'admin'
        next
      } else if (req.body.auth_code !== ADMIN_SECRET) { 
        next(({status: 400, message: "Invalid admin auth code"}))
      } 
    } else if (req.body.role_name.trim() === 'client'){
      req.role_name = 'client'
      next ()
    } else if (req.body.role_name.trim() === 'instructor' ) { 
      if (!req.body.auth_code) {
        next({status: 400, message: "instructor auth code required"})
      } else if (req.body.auth_code === INSTRUCTOR_SECRET) {
        req.role_name = 'instructor'
        next
      } else if (req.body.auth_code !== INSTRUCTOR_SECRET) { 
        next(({status: 400, message: "Invalid instructor auth code"}))
      }      
    } 
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
