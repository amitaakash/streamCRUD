import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import PageTitle from './placeholders/PageTitle';
import history from '../../history';

export class StreamEdit extends Component {
  currentId = this.props.match.params.id || null;

  componentDidMount = async () => {
    await this.props.fetchStream(this.currentId);
  };

  onSubmit = async formValues => {
    console.log(formValues);
    await this.props.editStream(this.currentId, formValues);
    history.push('/');
  };

  render() {
    let renderList = <Spinner animation="border" />;
    if (this.props.stream) {
      const { title, description } = this.props.stream;
      renderList = (
        <StreamForm
          initialValues={{ title, description }}
          onSubmit={this.onSubmit}
        />
      );
    }
    console.log(this.props.stream);
    return (
      <>
        <PageTitle pageTitle="Edit stream" />
        {renderList}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.stream;
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
