const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Route = require('../models/Routes');
const PoI = require('../models/PlaceOfInterest');

router.get('/', ensureLoggedIn(), (req,res) => {
  Route.find()
  .populate('places')
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
    places,
    description: req.body.description
  })
    .then(() => {
      res.redirect('/')
    })
    .catch(e => console.log(e));
});

router.post('/estimate', (req,res) => {
  res.status(200);
  PoI.find({'_id': {
    $in: req.body.places
  }}, {duration: 1, _id: 0, location: 1})
  .then(durations => {
    let arr = [];
    let locations = [];
    durations.forEach(e => arr.push(parseInt(e.duration.split(' ')[0])));
    let time = arr.reduce((a,b) => a+b);
    durations.forEach(e => locations.push(e.location));
    res.send({time, locations});
  })
  .catch(e => console.log(e));
});

module.exports = router;