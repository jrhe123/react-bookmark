var express = require('express');
var router = express.Router();


// cheerio
var cheerio = require('cheerio');
var superagent = require('superagent');

// scraper
var utils = require('../utils');


router.get('/', function(req, res, next){

	var url = req.query.url;

	if(url == null){
		res.json({
			confirmation: "fail",
			message: "please enter a valid url"
		})
		return;
	}

	superagent.get(url)
		.query(null)
		.set('Accept', 'text/html')
		.end(function(err, response){

			if(err){
				res.json({
					confirmation: "fail",
					message: err
				})
				return;
			}

			var html = response.text;
			var props = ['og:title', 'og:description', 'og:image', 'og:url'];
			var metaData = utils.Scraper.scrape(html, props);

			res.json({
				confirmation: 'success',
				tags: metaData
			})

		})

	

})

module.exports = router;