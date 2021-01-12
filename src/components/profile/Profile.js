import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params){
      console.log(this.props.match.params.username.toString());
      this.props.getProfileByHandle(this.props.match.params.username.toString());
    }  
  }

  render() {

    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (<div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <a href="profiles.html" className="btn btn-light mb-3 float-left">Back To Profiles</a>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{profile.username}'s Bio</h3>
                    <p className="lead">{profile.firstname} {profile.lastname}</p>
                    <p>Mail ID : {profile.email}</p>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (
      <React.Fragment>
        {profile}
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})


export default connect(mapStateToProps, { getProfileByHandle })(Profile);