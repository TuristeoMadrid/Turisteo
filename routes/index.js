const express = require('express');
const router  = express.Router();
const Route = require('../models/Routes');

/* GET home page */
router.get('/', (req, res, next) => {
  Route.find()  
  .then(routes => {
    res.render('index', {
      routes,
      routesStr: JSON.stringify(routes)})
  })
});


module.exports = router;
