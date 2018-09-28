const isAdmin = (redirectTo) => (req, res , next) => {
  req.user && req.user.admin ? next() : res.redirect(redirectTo);
};

module.exports = isAdmin;