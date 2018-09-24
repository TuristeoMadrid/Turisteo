const express = require('express');
const router  = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=Madrid&destination=Barcelona&key=AIzaSyCOsALo2IdOL1cIh24PLO9YR_lkcMckqR8')
  .then(data => {
    // console.log(data.data);
    res.render('index', {
      data:data.data,
      dataStr: JSON.stringify(data.data, {depth: null})});
  })
  .catch(e => console.log(e))
});


module.exports = router;
