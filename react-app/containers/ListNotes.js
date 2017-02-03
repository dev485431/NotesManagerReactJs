import React from "react"
import {connect} from "react-redux"
import SearchField from "../components/SearchField"

class ListNotes extends React.Component {

    // prop types for components used in this container
    static propTypes = {
        someObject: React.PropTypes.object
    }


    constructor(props) {
        super(props);
        // do some work in constructor
        // if (this.props.hotelList.status != LOADED) {
        //     this.props.loadData(this.props.search)
        // }

    }


    // 'main' render function
    render() {
        return (
            <SearchField/>
        )
    }

}


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(state => {

        // mapStateToProps
        // map application state to this container's props
        return {}

    },
    // mapDispatchToProps
    // when function is passed you can handle the dispatch()es of certain ACTIONS yourself
    dispatch => {
        return {}

    })(ListNotes)
