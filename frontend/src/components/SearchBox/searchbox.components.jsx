import React from "react";

import "./searchbox.styles.css";

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        };
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ query: value });
    };

    render() {
        return (
            <div className="searchbox">
                <form className="searchbox__form" noValidate>
                    <input
                        className="searchbox__field"
                        type="text"
                        name="query"
                        placeholder="Search a message"
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default SearchBox;
