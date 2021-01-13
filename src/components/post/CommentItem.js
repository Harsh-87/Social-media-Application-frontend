import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/postActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class CommentItem extends Component {

  onDeleteClick(postId, CommentId) {
    this.props.deleteComment(postId, CommentId);
  }
  render() {

    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-1">
            <Link to="/profiles">
              <img class="rounded-circle" src={comment.author.avatar} />
            </Link>
            <p className="text-center">{comment.author.username}</p>
          </div>
          <div className="col-10 border-left text-left">
            <p className="lead">{comment.comment}</p>
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