import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import history from '../../history';
import StreamForm from './StreamForm';
import PageTitle from './placeholders/PageTitle';

class StreamCreate extends React.Component {
  state = {
    isLoading: false
  };

  /* renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  };

  renderInput = formProps => {
    // console.log(formProps.meta);
    const className = `${
      formProps.meta.touched && formProps.meta.error ? 'is-invalid' : null
    }`;
    return (
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{formProps.label}</Form.Label>
        <Form.Control
          placeholder={formProps.label}
          {...formProps.input}
          autoComplete="off"
          className={className}
        />
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  }; */

  onSubmit = async formValues => {
    // console.log(formValues);
    alert('HI');
    this.setState({ isLoading: true });
    await this.props.createStream(formValues);
    history.push('/');
  };
  render() {
    //console.log(this.props);

    return (
      <>
        <PageTitle pageTitle="Create a stream" />
        <StreamForm onSubmit={this.onSubmit} />
      </>
    );
  }
}
/* const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }
  return errors;
}; */

const mapStateToProps = state => {
  return state.stream;
};

export default connect(mapStateToProps, { createStream })(StreamCreate);
