import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike } from '../../actions/postActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class PostItem extends Component {

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  findUserLikes(likes) {
    console.log('Likes', likes.length);
    if (likes.length > 0) {
      const { auth } = this.props;
      if (likes.filter(like => like.user === auth.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  render() {

    const { post, auth, showActions } = this.props;
    console.log('Post Item', post);
    return (
      <div className="card card-body mb-3 justify-content-start">
        <div className="row">
          <div className="col-md-9 text-left">
            <h3 className="text-info">{post.title}</h3>
          </div>
          {showActions && (
            <div className="col-md-3 border-left">
              <React.Fragment>
                <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                  <i className="fas fa-thumbs-up text-info"></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  <i className="fas fa-comment" />
                </Link>
                {post.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-trash" />
                </button>) : <React.Fragment></React.Fragment>}
              </React.Fragment>

            </div>
          )}
        </div>
        <hr />
        <div class="row">
          <div className="col-md-11 text-left">
            <p className="lead">{post.description}</p>
          </div>
        </div>
      </div>

    )

  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  showActions: PropTypes.bool
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike })(PostItem);