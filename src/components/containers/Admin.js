import React, { Component } from 'react';


import { APIManager } from '../../utils';

// redux
import actions from '../../actions';
import { connect } from 'react-redux';


// Components
import { Signup } from '../presentation';


class Admin extends Component{


	constructor(){

		super();
		this.state = {

			link: ''
		}
	}

	componentDidMount(){

		APIManager.get('/account/currentuser', null, (err, response) => {
			
			if(err){
				console.log(err);
				return;
			}

			if(response.profile == null){
				return;
			}

			this.props.currentUserReceived(response.profile);
		})
	}

	onSubmit(visitor){

		APIManager.post('/account/register', visitor, (err, response) => {

			if(err){
				let msg = err.message || err;
				console.log(msg);
				return;
			}

			this.props.profileCreated(response.profile);
		})

		return;
	}

	onLogin(visitor){

		APIManager.post('/account/login', visitor, (err, response) => {

			if(err){
				let msg = err.message || err;
				console.log(msg);
				return;
			}

			this.props.currentUserReceived(response.profile);
		})

		return;
	}


	updateLink(e){
		e.preventDefault();

		this.setState({
			link: e.target.value
		})
	}

	submitLink(e){
		e.preventDefault();

		let bookmark = {
			profile: this.props.currentUser.id,
			url: this.state.link
		}

		APIManager.post('/api/bookmark', bookmark, (err, response) => {
			
			if(err){
				console.log(err);
				return;
			}

			console.log(response);
			this.props.bookmarkCreated(response.result);
		})
	}


	render(){

		return(
			<div>
				{
					(this.props.currentUser != null) ? 
						(
							<div>	
								<h1>Hello, {this.props.currentUser.firstName}</h1>
								<input onChange={this.updateLink.bind(this)} type="text" placeholder="www.google.ca" />
								<button onClick={this.submitLink.bind(this)}>Submit</button>
							</div>
						) :
						(
							<Signup hitRegister={this.onSubmit.bind(this)} 
									hitLogin={this.onLogin.bind(this)} />
						)
				}	
			</div>		
		)
	}


}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		currentUser: state.account.currentUser
	}
}

const dispatchToProps = (dispatch) => {

	return {
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),

		bookmarkCreated: (bookmark) => dispatch(actions.bookmarkCreated(bookmark))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin);