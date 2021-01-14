import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const PrivateRoute = (multipleprops) => {
    console.log(multipleprops);
    const {component: Component,auth ,...rest} = multipleprops;

    return <Route
        {...rest}
        render = {
            props => auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to='/login' />)
        }    
    />
};

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps,{})(PrivateRoute);