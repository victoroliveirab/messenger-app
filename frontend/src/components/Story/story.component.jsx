import React from "react";
import { connect } from "react-redux";
import Avatar from "../Avatar/avatar.component";

import "./story.style.css";

const Story = props => {
    if (props.selectedContact) {
        const current = props.stories.find(
            element => element.contact.username === props.selectedContact
        );
        const stories = current.stories;
        return (
            <div className="story-container">
                <div
                    id="carouselStories"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li
                            data-target="#carouselStories"
                            data-slide-to="0"
                            className="active"
                            data-interval="10000"
                            key={0}
                        ></li>
                        {stories.slice(1).map((_, index) => (
                            <li
                                data-target="#carouselStories"
                                data-interval="10000"
                                data-slide-to={`${index + 1}`}
                                key={index + 1}
                            ></li>
                        ))}
                    </ol>
                    <div className="carousel-inner">
                        {stories.map((story, index) => {
                            const gradient = {
                                background: `${story.gradient}`
                            };
                            return (
                                <div
                                    className={`carousel-item ${
                                        index === 0 ? "active" : null
                                    }`}
                                    key={story.id}
                                >
                                    <div
                                        className="carousel-background"
                                        style={gradient}
                                    ></div>
                                    <div className="carousel-title">
                                        <Avatar
                                            username={props.selectedContact}
                                            token={props.token}
                                            rounded
                                        />
                                        <div className="carousel-title__info">
                                            <h5 className="carousel-title__owner">
                                                {props.selectedContact}
                                            </h5>
                                            <h6 className="carousel-title__time-ago">
                                                22 minutes ago
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="carousel-text">
                                        <h2 className="carousel-text__message">
                                            {story.text}
                                        </h2>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselStories"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselStories"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
    return (
        <div className="story-container">
            <div></div>
            <h2 className="story-title">Select a story to start</h2>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.user.token,
    selectedContact: state.story.selectedContact,
    stories: state.story.stories
});

export default connect(mapStateToProps)(Story);
