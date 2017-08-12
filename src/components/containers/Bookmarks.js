import React, { Component } from 'react';


import { APIManager } from '../../utils';


// redux
import actions from '../../actions';
import { connect } from 'react-redux';


class Bookmarks extends Component{

	constructor(){
		super();

		this.state = {
			
		}
	}

	componentDidMount(){

	}

	componentDidUpdate(){

		const list = this.props.bookmarks[this.props.selected.id];
		if(list != null){ // break loop
			return
		}

		const params = {profile: this.props.selected.id}
		APIManager.get('/api/bookmark', params, (err, response) => {

			if(err){
				return;
			}

			this.props.bookmarksReceived(response.results, params);
		})
	}

	render(){

		const list = (this.props.selected == null) 
				? null : this.props.bookmarks[this.props.selected.id];

		return(
			<div>
				<h2>Bookmarks</h2>
				<ol>
					{
						(list == null) 
						?  null : list.map((bookmark, i) => {
							return (
								<li key={bookmark.id}>{bookmark.description}</li>
							)
						})
					}
				</ol>	
			</div>		
		)
	}


}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		selected: state.profile.selected,
		bookmarks: state.bookmark
	}
}

const dispatchToProps = (dispatch) => {

	return {
		
		bookmarksReceived: (bookmarks, params) => dispatch(actions.bookmarksReceived(bookmarks, params))
	}
}

export default connect(stateToProps, dispatchToProps)(Bookmarks);