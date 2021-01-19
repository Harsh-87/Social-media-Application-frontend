import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Follow, Unfollow } from './../../actions/profileActions'
class ProfilesItem extends Component {

  onFollowClick(id) {
    this.props.Follow(id);
  }

  onUnfollowClick(id) {
    this.props.Unfollow(id);
  }

  render() {
    const { profile } = this.props;
    const { user } = this.props.auth;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row align-items-center">
          <div className="col-2">
            <div height="200px" width="200px">
              <img className="rounded-circle" src={profile.avatar} alt="Avatar" />
            </div>
          </div>
          <div className="col-6 border-left text-left">
            <p style={{ fontSize: "20px", fontWeight: "600" }} >{profile.firstname} {profile.lastname}</p>
            <p style={{ fontSize: "16px" }}>{profile.email}</p>
          </div>
          <div className="col-4">
            <Link to={`/profile/${profile.username}`} className="btn btn-info m-1">View Profile</Link>
            {!profile.followers.includes(user._id) ? <button type="button" className="btn btn-success m-1" onClick={this.onFollowClick.bind(this, profile._id)}>Follow</button> : <button type="button" className="btn btn-secondary m-1" onClick={this.onUnfollowClick.bind(this, profile._id)}>Unfollow</button>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { Follow, Unfollow })(ProfilesItem);