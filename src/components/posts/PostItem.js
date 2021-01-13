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
    const date = new Date(post.createdAt);
    return (
      <div className="card card-body mb-3">
        <div className="row align-items-center">
          <div className={showActions ? "col-md-10 text-left" : "col-md-12 text-left"}>
            <div className="row align-items-center">
              <div className="col-1">
                <span><img className="rounded-circle" src={post?.author?.avatar} /></span>
              </div>
              <div className="col-8 p-0">
                <span>{post?.author?.firstname} {post?.author?.lastname}</span>
                <br />
                <span className="small">{date.toLocaleTimeString([], { timeStyle: 'short' })}</span>
              </div>
              <div className="col-3 text-right text-secondary small">
                <span>{date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          {showActions && (
            <div className="col-md-2 border-left">
              <React.Fragment>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  <i className="fas fa-comment" />
                </Link>
                {post.author._id === auth.user._id ? (<button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-trash" />
                </button>) : <React.Fragment></React.Fragment>}
              </React.Fragment>

            </div>
          )}
        </div>
        <hr />
        <div classname="row">
          <div className="col-md-11 text-left">
            <span className="h4 text-info">{post?.title}</span>
            <p className="lead">{post?.description}</p>
            {post.image ? (<img style={{ width: "600px", height: "500px" }} src={"http://localhost:5000/" + post?.image} />) : ('')}
          </div>
        </div>
        <hr />
        <div className="row">
          {showActions && (
            <div className="col-md-12 text-left">
              <React.Fragment>
                <button type="button" onClick={this.onLikeClick.bind(this, post?._id)} className="btn btn-light mr-1">
                  <i className="fas fa-thumbs-up text-info"></i>
                  <span className="badge badge-light">{post?.likes?.length}</span>
                </button>
                {post.likes.map(element=>{
                  return <img style={{height:"35px", width:"35px"}} className="rounded-circle" src={element.author.avatar} />
                })}
              </React.Fragment>
            </div>
          )}
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