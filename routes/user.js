require('dotenv').config({path: '.env'});
const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const sendMail = require("../email/sendMail");
const Route = require('../models/Routes');
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

router.get('/admin', ensureLoggedIn(),(req, res) => {
    if(req.user.admin) {
        User.find()
        .then(users => {
            Route.find()
            .then(routes => {
                res.render('auth/admin', {users, routes, user:req.user});
            });
        });
    } else {res.redirect('/')}
});

router.post('/delete/user', (req,res) => {
    User.findByIdAndRemove(req.body.delete)
    .then(() => res.redirect('/admin'));
});

router.post('/update/user', (req,res) => {
    let {username, email, creator, status, admin} = req.body;
    creator === 'YES' ? creator = true : creator = false;
    status === 'YES' ? status = true : status = false;
    admin === 'YES' ? admin = true : admin = false;
    User.findByIdAndUpdate(req.user.update, {username, email, creator,status, admin})
    .then(() => res.redirect('/admin'));
})



module.exports = router;