const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Route = require('../models/Routes');
<<<<<<< HEAD
const Place = require('../models/PlaceOfInterest');

router.get('/', ensureLoggedIn(), (req,res) => {
  Place.find()
  Route.find()  
=======
const PoI = require('../models/PlaceOfInterest');

router.get('/', ensureLoggedIn(), (req,res) => {
  Route.find()
  .populate('places')
>>>>>>> 3605cfadc554a3551895c48257d962587ed67af1
  .then(routes => {
    console.log(routes);
    res.render('tourism/visit', {
      user: req.user,
      routes,
      routesStr: JSON.stringify(routes)
    });
  })
  .catch(e => console.log(e));
});

router.get('/create', (req,res) => {
  PoI.find()
  .then(places => {
    res.render('tourism/new-route', {
      user: req.user,
      places,
      placesStr: JSON.stringify(places)
    });
  })
  .catch(e => console.log(e));
});

router.post('/create', (req, res) => {
  const places = new Array;
  const sites = req.body.site;
  sites.forEach(e => places.push(e));
  Route.create({
    name: req.body.name,
    places
  })
    .then(() => {
      res.redirect('/')
    })
    .catch(e => console.log(e));
});

module.exports = router;