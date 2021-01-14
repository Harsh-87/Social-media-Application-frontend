import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params) {
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
                  <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <div className="row">
                      <div className="col-4">
                        <img className="rounded-circle" src={profile[0].avatar} alt="Avatar" />
                      </div>
                      <div className="col-8 p-5 text-left border-left">
                        <h3 className="text-info">{profile[0].username}'s Bio</h3>
                        <p>Name : {profile[0].firstname} {profile[0].lastname}</p>
                        <p>Mail ID : {profile[0].email}</p>
                        <p>Followers : {profile[0].followers.length}</p>
                        <p>Following : {profile[0].following.length}</p>
                      </div>
                    </div>
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
        {profileContent}
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