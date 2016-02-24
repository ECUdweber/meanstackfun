'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Good Schema
 */
var GoodSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Good name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please give a description for this item.',
		trim: true
	},	
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Good', GoodSchema);