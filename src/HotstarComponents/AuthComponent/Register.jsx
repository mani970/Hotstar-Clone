import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { toast } from "react-toastify";
import md5 from "md5";

import { Link } from "react-router-dom";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      password: "",
    };
  }
  //handle Change event
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //handle submit
  handleSubmit = async (e) => {
    let { username, email, phone, password } = this.state;

    try {
      e.preventDefault();
      let userInfo = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //email verification firebase is having built-in method sendEmailVerification()
      userInfo.user.sendEmailVerification();
      let verificationMessage = `A verification has been sent to ${email} Please verify the email address`;
      toast.success(verificationMessage);
      console.log(userInfo);
      //update profile including profile photo , phone number , id
      await userInfo.user.updateProfile({
        displayName: username,
        photoURL: `https://www.gravatar.com/avatar/${md5(
          userInfo.user.email
        )}?d=identicon`,
      });

      // await userInfo.user.updatePhoneNumber({
      //   phoneCredential: phone,
      // });
      //save user profile in to firebase realtime database
      await firebase
        .database()
        .ref()
        .child("/users" + userInfo.user.uid)
        .set({
          email: userInfo.user.email,
          photoURL: userInfo.user.photoURL,
          displayName: userInfo.user.displayName,
          uid: userInfo.user.uid,
          registrationDate: new Date().toString(),
        });
      this.setState({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  render() {
    let { username, email, phone, password } = this.state;
    return (
      <Fragment>
        <section className="authBlock">
          <section className="card col-md-3 mx-auto">
            <article className="form-block">
              <h5 className="h5 font-weight-bold p-4">Register to continue</h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={phone}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-block btn-outline-primary">
                      Register
                    </button>
                  </div>
                  <div className="form-group">
                    <span>
                      Already i have an account Please
                      <Link to="/login" className="register-link float-right">
                        Login
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </article>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default Register;