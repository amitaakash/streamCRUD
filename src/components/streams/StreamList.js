import React from 'react';
import { fetchStreams, deleteStream } from '../../actions';
import * as actionType from '../../actions/types';
import { connect } from 'react-redux';
import { Card, Button, Modal } from 'react-bootstrap';
import PageTitle from './placeholders/PageTitle';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  state = {
    deleteModal: false,
    selectedStream: null
  };

  componentDidMount = () => {
    this.props.fetchStreams({ type: actionType.FETCH_STREAMS });
  };

  onDeleteClick = (event, id) => {
    event.preventDefault();
    const selectedStream = this.props.streams.streams.filter(
      stream => stream.id === id
    );
    this.setState(prevState => ({
      ...prevState,
      deleteModal: true,
      selectedStream
    }));
  };

  handleClose = () => {
    this.setState(prevState => ({
      ...prevState,
      deleteModal: false,
      selectedStream: null
    }));
  };

  onDeleteConfirm = async id => {
    await this.props.deleteStream(id);
    this.setState(prevState => ({
      ...prevState,
      deleteModal: false,
      selectedStream: null
    }));
  };
  renderAdmin = stream => {
    if (stream.userId === this.props.currentUser.userId) {
      return (
        <Card.Footer className="text-right">
          <Button
            variant="outline-danger mr-1"
            size="sm"
            onClick={event => this.onDeleteClick(event, stream.id)}
          >
            DELETE
          </Button>
          <Link
            to={`/streams/edit/${stream.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            EDIT
          </Link>
        </Card.Footer>
      );
    }
  };
  render() {
    const renderStreamCards = this.props.streams.streams.map(stream => (
      <Card key={stream.id} className="mt-2">
        <Card.Body>
          <Card.Title>{stream.title}</Card.Title>
          <Card.Text>{stream.description}</Card.Text>
        </Card.Body>
        {this.renderAdmin(stream)}
      </Card>
    ));

    let confirmBoxDelete = (
      <Modal
        show={this.state.deleteModal}
        onHide={this.handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete this stream</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.selectedStream ? (
            <>
              <h4>{this.state.selectedStream[0].title}</h4>
              <p>{this.state.selectedStream[0].description}</p>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              this.onDeleteConfirm(
                this.state.selectedStream
                  ? this.state.selectedStream[0].id
                  : null
              )
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    // console.log(this.props);
    return (
      <div>
        <PageTitle
          createStream={this.props.currentUser.isSignedIn}
          pageTitle="All streams"
        />
        {renderStreamCards}
        {confirmBoxDelete}
      </div>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state);
  return { streams: state.stream, currentUser: state.auth };
};

export default connect(mapStateToProps, { fetchStreams, deleteStream })(
  StreamList
);
