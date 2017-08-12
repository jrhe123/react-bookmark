import constants from '../constants';

var initialState = {

	list: [],
	selected: null
}

export default (state = initialState, action) => {


	let updated = Object.assign({}, state);
	switch(action.type){

		case constants.PROFILES_RECEIVED:

			console.log('reducer received, call back to component');
			
			updated['list'] = action.profiles;

			if(action.profiles.length > 0){
				updated['selected'] = action.profiles[0]
			}

			return updated;

		case constants.PROFILE_CREATED:

			console.log('reducer received, call back to component');
			
			let updatedList = Object.assign([], updated['list']);
			updatedList.push(action.profile);
			updated['list'] = updatedList;
			return updated;	

		case constants.PROFILE_SELECTED:

			console.log('reducer received, call back to component');			
			updated['selected'] = action.profile;
			return updated;		


		default:
			
			return state;	

	}

}