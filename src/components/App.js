import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import { Route } from 'react-router-dom';

import {
  StreamList,
  StreamShow,
  StreamCreate,
  StreamEdit,
  StreamDelete
} from './streams';

function App() {
  return (
    <>
      <Header />
      <Container className="mt-2">
        <Route path="/" exact component={StreamList} />
        <Route path="/streams/new" exact component={StreamCreate} />
        <Route path="/streams/edit/:id" exact component={StreamEdit} />
        <Route path="/streams/delete" exact component={StreamDelete} />
        <Route path="/streams/show" exact component={StreamShow} />
      </Container>
    </>
  );
}

export default App;
