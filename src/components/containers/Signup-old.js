import React, { Component } from 'react';


import { APIManager } from '../../utils';

// redux
import actions from '../../actions';
import { connect } from 'react-redux';


class Signup extends Component{

	constructor(){

		super();
		this.state = {

			visitor: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			}
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


	updateVisitor(event){
		let updated = Object.assign({}, this.state.visitor);
		updated[event.target.id] = event.target.value;
		this.setState({
			visitor: updated
		})
	}

	onSubmit(e){
		e.preventDefault();

		APIManager.post('/account/register', this.state.visitor, (err, response) => {

			if(err){
				let msg = err.message || err;
				console.log(msg);
				return;
			}

			this.props.profileCreated(response.profile);
		})

		return;
	}

	onLogin(e){
		e.preventDefault();

		APIManager.post('/account/login', this.state.visitor, (err, response) => {

			if(err){
				let msg = err.message || err;
				console.log(msg);
				return;
			}

			this.props.currentUserReceived(response.profile);
		})

		return;
	}

	render(){

		return(
			<div>
				{
					(this.props.currentUser != null) ? 
						<h1>Hello, {this.props.currentUser.firstName}</h1> :
						(
							<div>
								<div>
									<h2>Register</h2>
									<input type="text" onChange={this.updateVisitor.bind(this)} id="firstName" placeholder="first name" />
									<input type="text" onChange={this.updateVisitor.bind(this)} id="lastName" placeholder="last name" />
									<input type="text" onChange={this.updateVisitor.bind(this)} id="email" placeholder="email" />
									<input type="text" onChange={this.updateVisitor.bind(this)} id="password" placeholder="password" />
									<button onClick={this.onSubmit.bind(this)}>Submit</button>
								</div>

								<div>
									<h2>Login</h2>
									<input type="text" onChange={this.updateVisitor.bind(this)} id="email" placeholder="email" />
									<input type="text" onChange={this.updateVisitor.bind(this)} id="password" placeholder="password" />
									<button onClick={this.onLogin.bind(this)}>Login</button>
								</div>
							</div>
						)
				}	
			</div>			
		)
	}
}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		profiles: state.profile.list,

		currentUser: state.account.currentUser
	}
}

const dispatchToProps = (dispatch) => {

	return {
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Signup);