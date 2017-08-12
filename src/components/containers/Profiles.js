import React, { Component } from 'react';


// Utils
import { APIManager } from '../../utils';


// redux
import actions from '../../actions';
import { connect } from 'react-redux';


class Profiles extends Component{

	constructor(){

		super();
		this.state = {
			profiles: []
		}
	}

	componentDidMount(){
		APIManager.get('/api/profile', null, (err,response) => {
			const results = response.results;

			this.props.profilesReceived(results)

			// this.setState({
			// 	profiles: results
			// })
		})
	}

	selectProfile(profile, e){
		e.preventDefault();

		this.props.profileSelected(profile);
	}


	render(){

		// render the props from redux
		const list = this.props.profiles.map((profile, i) => {

			let name = null;
			if(this.props.selected == null){
				name = <a onClick={this.selectProfile.bind(this, profile)} href="#">{profile.firstName}</a>
			}else if(this.props.selected.id == profile.id){
				name = <a onClick={this.selectProfile.bind(this, profile)} href="#"><strong style={{color:"red"}}>{profile.firstName}</strong></a>
			}else{
				name = <a onClick={this.selectProfile.bind(this, profile)} href="#">{profile.firstName}</a>
			}

			return (
				<li key={profile.id}>
					{name}
				</li>
			)
		})

		return(
			<div>
				<h2>Profiles</h2>
				<ol>
					{list}
				</ol>
			</div>
		)
	}
}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		profiles: state.profile.list,
		selected: state.profile.selected,
	}
}

const dispatchToProps = (dispatch) => {

	return {
		profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),

		profileSelected: (profile) => dispatch(actions.profileSelected(profile))
	}
}


export default connect(stateToProps, dispatchToProps)(Profiles);