import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Jumbotron } from 'react-bootstrap';

const StreamForm = props => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  };

  const renderInput = formProps => {
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
        {renderError(formProps.meta)}
      </Form.Group>
    );
  };

  const onSubmit = formValues => {
    console.log(formValues);
    props.onSubmit(formValues);
  };

  //console.log(props);
  return (
    <Jumbotron>
      <form
        onSubmit={props.handleSubmit(onSubmit)}
        className="needs-validation"
      >
        <Field name="title" component={renderInput} label="Enter Title" />
        <Field
          name="description"
          component={renderInput}
          label="Enter Description"
        />
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Jumbotron>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }
  return errors;
};

export default reduxForm({ form: 'StreamForm', validate })(StreamForm);
