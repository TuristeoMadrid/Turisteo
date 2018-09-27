require('dotenv').config({path: '.env'});
const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const sendMail = require("../email/sendMail");
const hbs = require('hbs');
const fs = require('fs');

  
router.get('/profile', ensureLoggedIn(), (req,res) => {
    res.render('auth/profile', {user: req.user});
});

router.post('/profile', (req, res) => {
    let user = req.user;
    let subject = 'Account Confirmation';
    let url = process.env.CONFIRMATION
    let template = hbs.compile(fs.readFileSync('./email/templates/creator.hbs').toString());
    let html = template({user, url});
    sendMail(user.email, subject, html)
    .then(() => {
        res.redirect("/confirm");
    })
    .catch(e => console.log(e));
});

router.get('/creator/:confirmCode', (req, res) => {
	const confirmationCode = req.params.confirmCode;
	User.findOneAndUpdate({confirmationCode}, {creator: true}, {new: true})
	.then((user) => {
		res.render("auth/confirmation", {user} );
	})
	.catch((err) => {
		console.log(err);
	});
});

router.get('/confirm', (req,res) => {
    res.render('auth/confirm');
});

router.get('/admin', (req, res) => {
    res.render('index')
});

module.exports = router;