import React, { Component, Fragment } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./HotstarComponents/AuthComponent/Login";
import Register from "./HotstarComponents/AuthComponent/Register";
import HeaderComponent from "./HotstarComponents/HeaderComponent/Header";
import PasswordReset from "./HotstarComponents/AuthComponent/PasswordReset";
import AddMovieForm from "./HotstarComponents/HotStarAdmin/AddMovieForm";
import ListMovies from "./HotstarComponents/HotStarAdmin/ListMovies";
import ListMovie from "./HotstarComponents/HotStarAdmin/ListMovie";
// import RefExample from "./RefComponent/RefExampleComponent";
import PhoneAuth from "./HotstarComponents/AuthComponent/PhoneAuth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: "" };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // if (user === null) {
      //   console.log("no user");
      // }
      if (user) {
        this.setState({ userData: user });
        this.props.history.push("/list-movies");
      } else {
        this.setState({ userData: "" });
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <Fragment>
        <header>
          <HeaderComponent user={this.state.userData} />
        </header>

        <main>
          <ToastContainer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/phone-auth" component={PhoneAuth} />
            {this.state.userData ? (
              <Fragment>
                <Route
                  path="/upload-movies"
                  exact
                  component={() => <AddMovieForm user={this.state.userData} />}
                />
                <Route
                  path="/list-movies"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />

                <Route
                  path="/list-movie/:name/:id"
                  exact
                  component={() => <ListMovie user={this.state.userData} />}
                />
              </Fragment>
            ) : null}
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(App);