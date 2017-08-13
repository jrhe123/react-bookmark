var express = require('express');
var router = express.Router();


// Controllers
var controllers = require('../controllers');

// Bcrypt
var bcrypt = require('bcryptjs');

// Util
var utils = require('../utils');


router.post('/login', function(req, res, next) {
  
  var params = req.body;
	controllers.profile
		.find({email: params.email}, true)
		.then(function(profiles){

			if(profiles.length == 0){
				res.json({
					confirmation: 'fail',
					message: 'Profile not found'
				})
				return;
			}

			
			var profile = profiles[0];

			var passwordCorrect = bcrypt.compareSync(params.password, profile.password);
			if(passwordCorrect == false){
				res.json({
					confirmation: 'fail',
					message: 'Password incorrect'
				})
				return;
			}

			// create login token
			var token = utils.JWT.sign({id:profile._id}, process.env.TOKEN_SECRET);
			// assign to client session
			req.session.token = token;

			res.json({
				confirmation: 'success',
				profile: profile.summary(),
				token: token
			})

		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

});



// Check Login & Logout
router.get('/:action', function(req, res, next) {
  
  	var action = req.params.action;
  	

  	// check login session
  	if(action == 'currentuser'){	

  		if(req.session == null){
  			res.json({
  				confirmation: 'success',
  				message: 'User not logged in.'
  			})
  			return;
  		}

  		if(req.session.token == null){
  			res.json({
  				confirmation: 'success',
  				message: 'User not logged in.'
  			})
  			return;
  		}

  		var token = req.session.token;
  		utils.JWT.verify(token, process.env.TOKEN_SECRET)
  			.then(function(decode){

  				return controllers.profile.findById(decode.id)
  			})
  			.then(function(profile){
  				res.json({
  					confirmation: 'success',
  					profile: profile
  				})
  			})
  			.catch(function(err){
  				res.json({
  					confirmation: 'fail',
  					message: 'Invalid token.'
  				})
  				return;
  			})
  	}


  	if(action == 'logout'){
  		req.session.reset();
  		res.json({
  			confirmation: 'success'
  		})
  	}


});



// register, then login
router.post('/register', function(req, res, next) {
  
  var params = req.body;
  controllers.profile
    .create(params)
    .then(function(profile){

      // create login token
      var token = utils.JWT.sign({id:profile.id}, process.env.TOKEN_SECRET);
      // assign to client session
      req.session.token = token;

      res.json({
        confirmation: 'success',
        profile: profile,
        token: token
      })

    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      })
    })

});




// New API
router.post('/validate', function(req, res, next) {

  var token = req.body.token;
  utils.JWT.verify(token, process.env.TOKEN_SECRET)
  .then(function(decode){

    return controllers.profile.findById(decode.id)
  })
  .then(function(profile){
    res.json({
      confirmation: 'success',
      profile: profile
    })
  })
  .catch(function(err){
    res.json({
      confirmation: 'fail',
      message: 'Invalid token.'
    })
    return;
  })

});


module.exports = router;
