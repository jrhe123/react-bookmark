import React, { Component } from 'react';


// Libraries
import CircularProgress from 'material-ui/CircularProgress';


class Loading extends Component{

    render(){

        const {
            mainContainer
        } = styles;
        
        return(
            <div style={mainContainer}>
                <CircularProgress 
                    size={100} 
                    thickness={8}
                    style={{marginLeft: 50, marginTop: 50}} />
            </div>
        )
    }
}

const styles = {

    mainContainer: {
        width: 200,
        height: 200,
        margin: '0 auto'
    }
}

export default Loading;