import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions'
class CommentForm extends Component {

  constructor() {
    super();
    this.state = {
      comment: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { postId } = this.props;
    const newComment = {
      comment: this.state.comment,
    }
    this.props.addComment(postId, newComment);
    this.setState({ comment: '' });

  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info bg-secondary">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply To Post"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button onClick={this.onSubmit} className="btn btn-light">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
