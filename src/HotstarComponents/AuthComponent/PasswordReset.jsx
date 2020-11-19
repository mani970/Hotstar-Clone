import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  //handle Change event
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    let { email } = this.state;
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      this.props.history.push("/login");
      toast.success(`Please verify ${email} and change password`);
    } catch (err) {
      this.props.history.push("/password-reset");
      toast.error(err.message);
    }
  };

  render() {
    let { email } = this.state;
    return (
      <Fragment>
        <section className="authBlock">
          <section className="card col-md-3 mx-auto">
            <article className="form-block">
              <h5 className="h5 font-weight-bold p-4">
                Enter email for reset password
              </h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
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
                    <button className="btn btn-block btn-outline-primary">
                      Reset Password
                    </button>
                  </div>
                  <div className="form-group">
                    <span>
                      Go back to
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

export default withRouter(PasswordReset);