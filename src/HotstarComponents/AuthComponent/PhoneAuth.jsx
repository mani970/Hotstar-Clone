import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
class PhoneAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
    };
  }
  //handle Change event
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
        
    try {
      let captchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone, captchaVerifier)
        .then(confirmationResult => {
          //   window.confirmationResult = confirmationResult;
          toast.success("otp sent", confirmationResult);
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.messages);
    }
  };
  render() {
    let { phone } = this.state.phone;
    return (
      <Fragment>
        <section className="authBlock">
          <section className="card col-md-3 mx-auto">
            <article className="form-block">
              <h5 className="h5 font-weight-bold p-4">
                Enter your mobile number
              </h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
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
                    <div id="recaptcha-container"></div>
                  </div>

                  <div className="form-group">
                    <button className="btn btn-block btn-outline-primary">
                      continue
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

export default withRouter(PhoneAuth);