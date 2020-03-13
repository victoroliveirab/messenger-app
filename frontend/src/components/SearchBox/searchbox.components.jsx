import React from "react";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
                        label=""
                        placeholder="Search a message"
                        fullWidth
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default SearchBox;
