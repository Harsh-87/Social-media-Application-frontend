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
      image: null,
      imgURL: null,
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
    let newPost = new FormData();
    newPost.append("title", this.state.title);
    newPost.append("description", this.state.description);
    newPost.append("image", this.state.image);
    this.props.addPost(newPost);
    this.setState({ title: '', description: '', image: null, imgURL: null });
  }

  onChange(e) {
    e.preventDefault();
    if (e.target.name === 'image') {
      this.setState({ [e.target.name]: e.target.files[0], imgURL: URL.createObjectURL(e.target.files[0]) })
    }
    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
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
                {this.state.imgURL ? (<img style={{ width: "600px", height: "500px" }} src={this.state.imgURL} />) : ('')}
              </div>
              <label for="image"><i class='m-2 p-2 fas fa-camera btn btn-light text-info' style={{ cursor: "pointer" }}> Upload Image </i></label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={this.onChange}
                style={{ display: "none" }}
                error={errors.text}
              />
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
