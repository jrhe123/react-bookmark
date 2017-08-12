import React, { Component } from 'react';



// components
import { Profiles, Admin, Bookmarks } from '../containers';



class Home extends Component{

	render(){

		return(
			<div className="row">
				<div className="col-md-3">
					<Profiles />
				</div>
				<div className="col-md-6">
					<Bookmarks />
				</div>
				<div className="col-md-3">
					<Admin />
				</div>
			</div>
		)
	}
}

export default Home;