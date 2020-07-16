const express = require('express');
const connection = require('../db');

module.exports.login = async (req, res) => {
  console.log("Email:", req.body);

  var email = req.body.email;
  var password = req.body.password;

  var loginUserQuery = 'SELECT * FROM user WHERE email = ?';

  connection.query(loginUserQuery, email, function(err, result) {
    console.log('result--', result);
    if (err) {
      res.send({
        code: 400,
        failed: 'error ocurred'
      });
    } else {
        res.json(result);
    }
  });
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.send({
        code: 200,
        success: 'User logged out successfully'
      });
    });
};
