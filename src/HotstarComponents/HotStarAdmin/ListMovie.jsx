import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import firebase from "../../firebase";

class ListMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      duration: "",
    };

    this.videoRef = React.createRef();
    this.mainVideoRef = React.createRef();
    this.afterFullWidth = React.createRef();
    this.image_gradientRef = React.createRef();
  }

  VideoPlayOrPaused = () => {
    this.videoRef.current.style.width = "100%";
    this.videoRef.current.style.height = "100%";
    this.videoRef.current.play();
    this.mainVideoRef.current.style.display = "none";
    this.image_gradientRef.current.style.display = "none";
    this.afterFullWidth.current.style.width = "100%";
    this.videoRef.current.setAttribute("controls", "controls");
  };

  async componentDidMount() {
    await firebase
      .database()
      .ref("hotstarMovie")
      .child(this.props.location.state.id)
      .on("value", snapShot => {
        let newPost = snapShot.val();
        this.setState({ movie: newPost });
      });
  }

  render() {
    let {
      name,
      url,
      year,
      type,
      rating,
      description,
      language,
    } = this.state.movie;

    let date = new Date(year).getFullYear();
    return (
      <Fragment>
        <section className="moviesBlock movieBlockId">
          <article
            className="row mainPlayerBlock"
            onClick={this.VideoPlayOrPaused}
          >
            <main ref={this.mainVideoRef}>
              <h2>{name}</h2>
              <div className="descriptionBlock">
                <ul>
                  <li>
                    <span>{date}</span>
                  </li>
                  <li>
                    <span>{type}</span>
                  </li>
                  <li>
                    <span>{rating}</span>
                  </li>
                  <li>
                    <span>{language}</span>
                  </li>
                </ul>
              </div>
              <div>
                <p>{description}</p>
              </div>
              <footer>
                <div className="watchBlock">
                  <span>
                    <i className="fas fa-play"></i>
                  </span>
                  <button>Watch Movie</button>
                </div>
              </footer>
            </main>
            <div className="containerBlock"></div>
            <div className="image-gradient" ref={this.image_gradientRef}></div>
            <aside className="afterFullWidth" ref={this.afterFullWidth}>
              <video ref={this.videoRef}>
                <source src={url}></source>
              </video>
            </aside>
          </article>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ListMovie);
