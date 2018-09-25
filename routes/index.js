const express = require('express');
const router  = express.Router();
const Route = require('../models/Routes');

/* GET home page */
router.get('/', (req, res, next) => {
  Route.find()  
  .then(routes => {
    res.render('index', {
      user: req.user,
      routes,
      routesStr: JSON.stringify(routes)})
  })
});


module.exports = router;
