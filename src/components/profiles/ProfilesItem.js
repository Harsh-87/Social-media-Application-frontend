import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validations/is-empty'

class ProfilesItem extends Component {
  render() {

    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row align-items-center">
          <div className="col-2">
            <div height="200px" width="200px">
              <img className="rounded-circle" src={profile.avatar} />
            </div>
          </div>
          <div className="col-8 border-left text-left">
            <p style={{fontSize:"20px", fontWeight:"600"}} >{profile.firstname} {profile.lastname}</p>
            <p style={{fontSize:"16px"}}>{profile.email}</p>
          </div>
          <div className="col-2">
            <Link to={`/profile/${profile.username}`} className="btn btn-info">View Profile</Link>
          </div>
        </div>
      </div>
    )
  }
}

ProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfilesItem;