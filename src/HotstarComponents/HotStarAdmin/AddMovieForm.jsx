import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
// import { Video } from "video-metadata-thumbnails";
class AddMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      year: "",
      description: "",
      rating: 0,
      language: "",
      type: "",
      duration: "",
      video: "",
      url: "",
      progress: 0,
      barStatus: false,
      minVal: 0,
      maxVal: 100,
    };
  }

  handleChange = e => {
    // handling value
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUploadFiles = e => {
    //handling files like upload files
    if (e.target.files[0]) {
      this.setState({ video: e.target.files[0] });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      let { video } = this.state;
      //MovieTask
      let MovieTask = firebase
        .storage()
        .ref(`/hotstarMovies/${video.name}`)
        .put(video);

      //events
      MovieTask.on(
        "state_changed",
        snapShot => {
          //progress status
          let progressStatus = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          ); //current status
          this.setState({ progress: progressStatus, barStatus: true });
        },
        err => {
          //error handling
          console.log(err);
        },
        () => {
          //completion of status and connect to database
          //get download url
          firebase
            .storage()
            .ref("hotstarMovies")
            .child(video.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url }, () => {
                //connect to real time database;
                let movieDetails = this.state;
                firebase
                  .database()
                  .ref("hotstarMovie")
                  .push({
                    ...movieDetails,
                  });
                toast.success("successfully movie created");
                // this.props.history.push("/");
              });
            })
            .catch(err => console.log(err));
        }
      );
    } catch (err) {
      toast.error(err.messages);
    }
  };

  render() {
    let {
      name,
      genre,
      year,
      description,
      rating,
      language,
      type,
      video,
      progress,
      barStatus,
    } = this.state;

    let progressBar = (
      <Fragment>
        <progress
          max="100"
          value={progress}
          style={{ width: "100%", position: "absolute", top: "30%" }}
        >
          {progress}
        </progress>
        <span>{progress}</span>
      </Fragment>
    );

    return (
      <Fragment>
        <section className="authBlock">
          <section className="card col-md-8 mx-auto">
            <article className="form-block">
              <h5 className="h5 font-weight-bold p-4">Add Movie to continue</h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="Genre">Genre</label>
                        <input
                          type="text"
                          className="form-control"
                          name="genre"
                          value={genre}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        {barStatus ? progressBar : null}
                        <label htmlFor="language">Upload Movie</label>
                        <input
                          type="file"
                          capture
                          className="form-control"
                          name="video"
                          onChange={this.handleUploadFiles}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={description}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="Year">Year</label>
                        <input
                          type="date"
                          className="form-control"
                          name="year"
                          value={year}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input
                          type="number"
                          className="form-control"
                          name="rating"
                          max="5"
                          min="0"
                          value={rating}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="language">Language</label>
                        <input
                          type="text"
                          className="form-control"
                          name="language"
                          value={language}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                          name="type"
                          id="type"
                          className="form-control"
                          value={type}
                          onChange={this.handleChange}
                        >
                          <option value="horror">horror</option>
                          <option value="drama">Drama</option>
                          <option value="action">Action</option>
                          <option value="comedy">Comedy</option>
                          <option value="romance">Romance</option>
                          <option value="thriller">Thriller</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group p-2">
                    <button className="btn float-right btn-outline-primary">
                      Add Movie
                    </button>
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

export default withRouter(AddMovieForm);