import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    // console.log('Gauth Renders');
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '53492136501-tvp0299kss31tjb3tj49m7qde9siullh.apps.googleusercontent.com',
          scope: 'profile email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());

          //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  onSignIn = event => {
    event.preventDefault();
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.props.auth.isSignedIn === null ? null : !this.props.auth
            .isSignedIn ? (
          <Button variant="outline-light" onClick={this.onSignIn}>
            Sign in with google
          </Button>
        ) : (
          <Button variant="outline-light" onClick={this.onSignOut}>
            Logout
          </Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
