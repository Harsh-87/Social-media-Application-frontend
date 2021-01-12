import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileByHandle } from '../../actions/profileActions'
import classnames from 'classnames';
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProfileByHandle(this.props.auth.user.username);
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            dashboardContent = <div>
                <p className="lead text-muted">Welcome <Link to={`/profile/${user.username}`}>{user.firstname}</Link></p>
            </div>
        }

        return (
            <div classnames="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" >
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    // deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle })(Dashboard)
