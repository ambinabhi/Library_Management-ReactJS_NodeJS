const express = require('express');
const router = express.Router();
const catchErrors = require('express-catch-errors');

const {login, logout} = require('../controller/user.controller');

router
  .route('/login')
  .post(catchErrors(login))

router
  .route('/logout')
  .get(catchErrors(logout));

module.exports = router;