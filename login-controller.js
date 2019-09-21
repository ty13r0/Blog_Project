const User = require('mongoose').model('User');

exports.register = function(req, res, next) {
	if (!req.user) {
		const user = new User(req.body);
		user.save(function(err) {
			if (err) {
				return res.send(err);
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/dashboard');
			});
		});
	} else {
		res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('index.html', {
			title: 'Home',
			username: req.user ? req.user.username : ''
		});
	} else {
		return res.redirect('/dashboard');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('index.html', {
			title: 'Home',
			username: req.user ? req.user.username : ''
		});
	} else {
		return res.redirect('/dashboard');
	}
};