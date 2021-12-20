import React, { Component } from "react";
import { connect } from "react-redux";
import {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteAllTutorials,
    deleteTutorial,
    setCurrentTutorial,
} from "../slices/tutorials";
import { Link } from "react-router-dom";

class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeTutorial = this.removeTutorial.bind(this);

        this.state = {
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    setActiveTutorial(tutorial, index) {
        this.props.setCurrentTutorial(tutorial);
    }

    removeTutorial() {
        this.props
            .deleteTutorial({ id: this.props.currentTutorial.id })
            .then(() => {
                this.props.history.push("/tutorials");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findByTitle() {
        this.props.findTutorialsByTitle({ title: this.state.searchTitle });
    }

    render() {
        const { searchTitle } = this.state;
        const { tutorials, currentTutorial } = this.props;

        console.log("tutorials :", tutorials);
        console.log("currentTutorial: ", currentTutorial);
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <table className="table table-fixed table-condensed">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorials &&
                                tutorials.map((tutorial, index) => (
                                    <tr
                                        className={
                                            currentTutorial &&
                                            tutorial.id === currentTutorial.id
                                                ? "active"
                                                : ""
                                        }
                                        key={index}
                                        onClick={() =>
                                            this.setActiveTutorial(
                                                tutorial,
                                                index
                                            )
                                        }
                                    >
                                        <td>{tutorial.title}</td>
                                        <td>{tutorial.description}</td>
                                        <td>
                                            {" "}
                                            {tutorial.published
                                                ? "Published"
                                                : "Pending"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    {currentTutorial && currentTutorial.id ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.published
                                    ? "Published"
                                    : "Pending"}
                            </div>

                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="m-3 btn btn-sm btn-success"
                            >
                                Edit
                            </Link>
                            <button
                                className="m-3 btn btn-sm btn-danger"
                                onClick={this.removeTutorial}
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tutorials: state.tutorials.listTutorials,
        currentTutorial: state.tutorials.currentTutorial,
    };
};

const mapDispatchToProps = {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteAllTutorials,
    deleteTutorial,
    setCurrentTutorial,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialsList);
