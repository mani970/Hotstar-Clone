/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase";

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("hotstarMovie")
      .on("value", hotstarMovies => {
        let movieInfo = [];
        hotstarMovies.forEach(movie => {
          movieInfo.push({
            _id: movie.val().id,
            id: movie.key,
            url: movie.val().url,
            name: movie.val().name,
            rating: movie.val().rating,
            description: movie.val().description,
            type: movie.val().type,
            language: movie.val().language,
            year: movie.val().year,
            user: this.props.user,
          });
        });
        this.setState({ movies: movieInfo });
      });

    try {
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    let Movies = this.state.movies.map(movie => (
      <Fragment key={movie.id}>
        <div className="col-md-2 thumbnail_video_block">
          <div className="videoBlock">
            <video className="thumbnail_video">
              <source src={movie.url}></source>
            </video>
            <div className="videoContentBlock">
              <h5>{movie.name}</h5>

              <div className="movieContentBlock">
                <p>{movie.type},</p>
                <p>{movie.language},</p>
                <p>{movie.year}</p>
              </div>
              <p className="movieDescriptionBlock">{movie.description}</p>
              <p className="watchMovieBlock">
                <span>
                  <span>
                    <i className="fas fa-play"></i>
                  </span>
                  <Link
                    to={{
                      pathname: `/list-movie/${movie.name}/${movie.id}`,
                      state: {
                        id: movie.id,
                        name: movie.name,
                        url: movie.url,
                      },
                    }}
                  >
                    Watch Movie
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    ));

    return (
      <Fragment>
        <section className="moviesBlock">
          <h2>Hindi</h2>
          <article className="row">
            {this.state.movies.length > 0 ? Movies : "loading..."}
          </article>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ListMovies);