const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get('/profile', ensureLoggedIn(), (req,res) => {
  res.render('profile', {user: req.user});
});

module.exports = router;