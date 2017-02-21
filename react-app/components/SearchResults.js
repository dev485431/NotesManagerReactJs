import React from "react"

export default class SearchResults extends React.Component {

    //todo: searchResult must be array consisting of Notes
    static propTypes = {
        searchResults: React.PropTypes.array.isRequired,
        isVisible: React.PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props)
    }

    //todo: display Note's for search results here
    render() {
        let searchResults = <div>123</div>;
        if (this.props.isVisible) {

        }
        return searchResults;
    }
}