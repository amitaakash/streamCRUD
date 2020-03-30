import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageTitle = props => {
  // console.log(props);
  return (
    <Container className="mt-4 mb-4">
      <Row>
        <Col>
          <h3>{props.pageTitle}</h3>
        </Col>
        <Col className="text-right">
          {props.createStream ? (
            <Link
              to="/streams/new"
              className="btn btn-outline-info mr-1 btn-sm"
            >
              Create new stream
            </Link>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default PageTitle;
