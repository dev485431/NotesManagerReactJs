import React from "react"
import {connect} from "react-redux"

import Menu from "../components/Menu"
import Folders from "../components/Folders"
import Search from "../components/Search"
import Files from "../components/Files"


class MainPage extends React.Component {

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
            <div>
                <div className="col-sm-1">
                    <Menu/>
                </div>
                <div className="col-sm-4">
                    <Folders />
                </div>
                <div className="col-sm-7">
                    <div className="row">
                        <Search/>
                    </div><br/>
                    <div className="row">
                        <Files />
                    </div>
                </div>
            </div>
        )
    }

}


// smart components are aware of the store
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

    })(MainPage)
