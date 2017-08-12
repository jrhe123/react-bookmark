import constants from '../constants';

export default {

	// 1.
	profilesReceived: (profiles) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.PROFILES_RECEIVED,
			profiles: profiles
		}
	},

	profileCreated: (profile) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.PROFILE_CREATED,
			profile: profile
		}
	},

	profileSelected: (profile) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.PROFILE_SELECTED,
			profile: profile
		}
	},


	// 2.
	currentUserReceived: (profile) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.CURRENT_URDER_RECEIVED,
			profile: profile
		}
	},



	// 3.
	bookmarksReceived: (bookmarks, params) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.BOOKMARKS_RECEIVED,
			bookmarks: bookmarks,
			params: params
		}
	},

	bookmarkCreated: (bookmark) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.BOOKMARK_CREATED,
			bookmark: bookmark
		}
	}


}