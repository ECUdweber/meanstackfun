'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Good = mongoose.model('Good'),
	_ = require('lodash');

/**
 * Create a Good
 */
exports.create = function(req, res) {
	var good = new Good(req.body);
	good.user = req.user;

	good.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(good);
		}
	});
};

/**
 * Show the current Good
 */
exports.read = function(req, res) {
	res.jsonp(req.good);
};

/**
 * Update a Good
 */
exports.update = function(req, res) {
	var good = req.good ;

	good = _.extend(good , req.body);

	good.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(good);
		}
	});
};

/**
 * Delete an Good
 */
exports.delete = function(req, res) {
	var good = req.good ;

	good.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(good);
		}
	});
};

/**
 * List of Goods
 */
exports.list = function(req, res) { 
	Good.find().sort('-created').populate('user', 'displayName').exec(function(err, goods) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goods);
		}
	});
};

/**
 * Good middleware
 */
exports.goodByID = function(req, res, next, id) { 
	Good.findById(id).populate('user', 'displayName').exec(function(err, good) {
		if (err) return next(err);
		if (! good) return next(new Error('Failed to load Good ' + id));
		req.good = good ;
		next();
	});
};

/**
 * Good authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.good.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
