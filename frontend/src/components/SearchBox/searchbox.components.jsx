import React from "react";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
            <Container maxWidth="xs">
                <form noValidate>
                    <Input
                        type="text"
                        name="query"
                        label=""
                        placeholder="Search a message"
                        fullWidth
                        onChange={this.handleChange}
                        variante="outlined"
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </form>
            </Container>
        );
    }
}

export default SearchBox;
