import React, { Component } from 'react';



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

	updateVisitor(event){
		let updated = Object.assign({}, this.state.visitor);
		updated[event.target.id] = event.target.value;
		this.setState({
			visitor: updated
		})
	}

	onSubmit(e){
		e.preventDefault();

		this.props.hitRegister(this.state.visitor);

		return;
	}

	onLogin(e){
		e.preventDefault();

		this.props.hitLogin(this.state.visitor);

		return;
	}

	render(){

		return(
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
}

export default Signup;