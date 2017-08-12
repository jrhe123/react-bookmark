// Import Schema
var Profile = require('../models/Profile');

// Promise
var Promise = require('bluebird');

// Bcrypt
var bcrypt = require('bcryptjs');



module.exports = {

	find: function(params, isRaw) {

		return new Promise(function(resolve, reject){

			Profile.find(params, function(err, profiles){

				if(err){
					reject(err);
					return;
				}

				if(isRaw){
					resolve(profiles);
					return;
				}

				var summaries = [];
				profiles.forEach(function(profile){
					summaries.push(profile.summary())
				})
				resolve(summaries);
			})
		})
	},

	findById: function(id) {

		return new Promise(function(resolve, reject){

			Profile.findById(id, function(err, profile){

				if(err){
					reject(err);
					return;
				}

				resolve(profile.summary());
			})
		})
	},

	create: function(params) {

		return new Promise(function(resolve, reject){

			// hash password
			var password = params.password;
			var hashed = bcrypt.hashSync(password, 10);
			params['password'] = hashed;

			Profile.create(params, function(err, profile){

				if(err){
					reject(err);
					return;
				}

				resolve(profile.summary());
			})
		})
	}


}