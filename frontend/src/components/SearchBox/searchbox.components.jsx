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
                    <Input
                        className="searcbox__field"
                        type="text"
                        name="query"
                        label=""
                        placeholder="Search a message"
                        fullWidth
                        onChange={this.handleChange}
                        variant="outlined"
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </form>
            </div>
        );
    }
}

export default SearchBox;
