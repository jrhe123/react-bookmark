import constants from '../constants';

var initialState = {

	all: []
}

export default (state = initialState, action) => {


	let updated = Object.assign({}, state);
	switch(action.type){

		case constants.BOOKMARKS_RECEIVED:

			console.log('reducer received, call back to component');

			const params = action.params;
			const keys = Object.keys(params);
			keys.forEach((key, i) => {
				let value = params[key];	// profile id
				updated[value] = action.bookmarks;
			})

			//updated['all'] = action.bookmarks;
			return updated;


		case constants.BOOKMARK_CREATED:

			console.log('reducer received, call back to component');

			let list = (updated[action.bookmark.profile]) 
				? updated[action.bookmark.profile] : [];
			list.push(action.bookmark);	
			updated[action.bookmark.profile] = list;
			
			return updated;	


		default:
			
			return state;	

	}

}