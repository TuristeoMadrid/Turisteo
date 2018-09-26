const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Route = require('../models/Routes');
const Place = require('../models/PlaceOfInterest');

router.get('/', ensureLoggedIn(), (req,res) => {
  Place.find()
  Route.find()  
  .then(routes => {
    res.render('tourism/visit', {
      user: req.user,
      routes,
      routesStr: JSON.stringify(routes)});
    });
});

module.exports = router;