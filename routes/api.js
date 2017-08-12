var express = require('express');
var router = express.Router();


// Use Controllers Methods
var controllers = require('../controllers');



router.get('/:resource', function(req, res, next) {
  
	var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return
	}

	// Promise
	controller.find(req.query, false)
		.then(function(entities){
			res.json({
				confirmation: 'success',
				results: entities
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

});


router.get('/:resource/:id', function(req, res, next) {
  
	var resource = req.params.resource;
	var id = req.params.id;

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return
	}

	// Promise
	controller.findById(id)
		.then(function(result){
			res.json({
				confirmation: 'success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: resource + ' ' + id + ' not found'
			})
		})

});


router.post('/:resource', function(req, res, next) {
  
	var resource = req.params.resource;
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return
	}

	// Promise
	controller.create(req.body)
		.then(function(result){
			res.json({
				confirmation: 'success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

});


module.exports = router;
