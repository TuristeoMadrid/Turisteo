const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Route = require('../models/Routes');


router.get('/profile', ensureLoggedIn(), (req,res) => {
  Route.find()  
  .then(routes => {
    res.render('profile', {
      user: req.user,
      routes,
      routesStr: JSON.stringify(routes)});
    });
});

module.exports = router;