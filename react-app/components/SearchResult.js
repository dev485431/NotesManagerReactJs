import React from "react"

export default class SearchResult extends React.Component {

    //todo: searchResult must be array consisting of Notes
    static propTypes = {
        notes: React.PropTypes.array.isRequired,
        isVisible: React.PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props)
    }

    //todo: display Note's for search results here
    render() {
        console.log(this.props.notes)
        return <div>

        </div>
    }
}