import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { profileReducer, accountReducer, bookmarkReducer } from '../reducers';

var store;
export default{

	configureStore: () => {

		const reducers = combineReducers({

			// match to stateToProps 'profile'
			profile: profileReducer,

			account: accountReducer,

			bookmark: bookmarkReducer
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)
		return store
	},

	currentStore: () => {
		return store
	}

}