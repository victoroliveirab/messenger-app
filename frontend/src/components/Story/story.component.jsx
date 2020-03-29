import React from "react";
import { connect } from "react-redux";
import Avatar from "../Avatar/avatar.component";

import "./story.style.css";

const Story = props => {
    if (props.selectedContact) {
        const current = props.stories.find(
            element => element.contact.username === props.selectedContact
        );
        const currentStory = current.stories[0];
        const colors = currentStory.gradient.split(",");
        const divStyle = {
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
        };
        //Todo: avoid second api call to a file we already have (avatar)
        // return (
        //     <div className="story-container" style={divStyle}>
        //         <div className="story-owner">
        //             <div className="story-owner__avatar">
        //                 <Avatar
        //                     username={props.selectedContact}
        //                     token={props.token}
        //                     rounded
        //                 />
        //             </div>
        //             <div className="story-owner__info">
        //                 <h5 className="story-owner__username">
        //                     {props.selectedContact}
        //                 </h5>
        //                 <h6 className="story-owner__time-ago">23 min ago</h6>
        //             </div>
        //         </div>
        //         <h2 className="story-text">{currentStory.text}</h2>
        //     </div>
        // );
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
                            data-interval="1000000"
                        ></li>
                        <li
                            data-target="#carouselStories"
                            data-slide-to="1"
                        ></li>
                        <li
                            data-target="#carouselStories"
                            data-slide-to="2"
                        ></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div
                                className="carousel-background"
                                style={divStyle}
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quod minus aliquam commodi
                                    possimus deleniti fugiat eaque aut iste.
                                    Tempora distinctio molestias eos eius esse
                                    doloremque consequuntur aut culpa? Qui,
                                    consectetur!
                                </h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt incidunt minima nobis
                                recusandae cupiditate ipsum libero omnis eos
                                sequi ipsam explicabo fugiat similique autem
                                nemo, rerum obcaecati fuga. Aliquid, eligendi!
                            </p>
                        </div>
                        <div className="carousel-item">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Officiis accusamus esse odit
                                ex quod, amet, asperiores pariatur neque nobis
                                eos nemo, explicabo laboriosam. Dolores numquam
                                odit minus, in illo eveniet.
                            </p>
                        </div>
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
