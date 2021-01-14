import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/postActions'
import PropTypes from 'prop-types'

class CommentItem extends Component {

  onDeleteClick(postId, CommentId) {
    this.props.deleteComment(postId, CommentId);
  }
  render() {

    const { comment, postId, auth } = this.props;
    const date = new Date(comment.createdAt);
    return (
      <div className="card card-body mb-3">
        <div className="row align-items-center">
          <div className="col-1 border-right">
            <Link to="/profiles">
              <img className="rounded-circle" src={comment.author.avatar} alt="Avatar" />
            </Link>
          </div>
          <div className={comment.author._id === auth.user._id ? "col-10" : "col-11"}>
            <div className="row">
              <div className="col-8 text-left">
                <span>{comment?.author?.firstname} {comment?.author?.lastname}</span>
                <br />
                <span className="small">{date.toLocaleTimeString([], { timeStyle: 'short' })}</span>
              </div>
              <div className="col-4 text-right text-secondary small">
                <span>{date.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="col-10 text-left">
                <p className="lead">{comment.comment}</p>
              </div>
            </div>
          </div>
          <div className="col-1">
            {comment.author._id === auth.user._id ? (<button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button" className="btn btn-danger mr-1">
              <i className="fas fa-trash" />
            </button>) : <React.Fragment></React.Fragment>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);