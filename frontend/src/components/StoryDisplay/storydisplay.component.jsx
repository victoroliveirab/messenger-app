import React from "react";
import Avatar from "../Avatar/avatar.component";
import { timeElapsedFromNow } from "../../utils/formatSendDate";
import "./storydisplay.style.css";
import "./carousel.style.css";

const StoryDisplay = props => {
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
                    {props.stories.slice(1).map((_, index) => (
                        <li
                            data-target="#carouselStories"
                            data-interval="10000"
                            data-slide-to={`${index + 1}`}
                            key={index + 1}
                        ></li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {props.stories.map((story, index) => {
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
                                    className="story-background"
                                    style={gradient}
                                ></div>
                                <div className="story-title">
                                    <Avatar
                                        username={props.selectedContact}
                                        token={props.token}
                                        rounded
                                    />
                                    <div className="story-title__info">
                                        <h5 className="story-title__owner">
                                            {props.selectedContact}
                                        </h5>
                                        <h6 className="story-title__time-ago">
                                            {timeElapsedFromNow(story.postTime)}
                                        </h6>
                                    </div>
                                </div>
                                <div className="story-text">
                                    <h2 className="story-text__message">
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
};

export default StoryDisplay;
