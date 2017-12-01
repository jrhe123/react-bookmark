import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Libraries
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Components
import {Home} from './components/layout';


// redux
import store from './stores';
import {Provider} from 'react-redux';


class App extends Component{

	render(){

		return(
			<Provider store={store.configureStore()}>
				<MuiThemeProvider>
					<Home />
				</MuiThemeProvider>
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));