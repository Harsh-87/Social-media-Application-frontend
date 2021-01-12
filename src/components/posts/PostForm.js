import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addPost } from '../../actions/postActions'
class PostForm extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
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
    const { user } = this.props.auth;
    const newPost = {
      title: this.state.title,
      description: this.state.description,
    }

    this.props.addPost(newPost);
    this.setState({ title: '', description: '' });

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
            Say Something...
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Post Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextAreaFieldGroup
                  placeholder="Post Description"
                  name="description"
                  value={this.state.description}
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

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
