const express = require('express');
const router = express.Router();
const Users = require('../../api/models/userModel'); // Assuming the model is located here

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await Users.get(); // Fetch users from the model
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
