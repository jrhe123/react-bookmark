import superagent from 'superagent';

export default{

	get: (endpoint, params, callback) => {

		superagent
			.get(endpoint)
			.query(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
					callback(err, null);
					return;
				}

				const confirmation = response.body.Confirmation;
				if(confirmation != 'Success'){
					callback({Message: response.body.Message}, null);
					return;
				}

				callback(null, response.body);
			})
	},

	post: (endpoint, params, callback) => {

		superagent
			.post(endpoint)
			.send(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
					callback(err, null);
					return;
				}

				const confirmation = response.body.Confirmation;
				if(confirmation != 'Success'){
					callback({Message: response.body.Message}, null);
					return;
				}

				callback(null, response.body);
			})
	},

	upload: (endpoint, formData, callback) => {

		superagent
			.post(endpoint)
			.send(formData)
			.end((err, response) => {
				if(err){
					callback(err, null);
					return;
				}

				const confirmation = response.body.Confirmation;
				if(confirmation != 'Success'){
					callback({Message: response.body.Message}, null);
					return;
				}

				callback(null, response.body);
			})
	}

}