import React from "react"
import {Link} from "react-router"

export default class MainMenu extends React.Component {
    static propTypes = {
        // title: React.PropTypes.shape({
        //     checkInDate: React.PropTypes.string.isRequired,
        //     checkOutDate: React.PropTypes.string.isRequired,
        //     guests: React.PropTypes.number.isRequired,
        //     radius: React.PropTypes.number.isRequired,
        //     location: React.PropTypes.string.isRequired,
        // }).isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-plus" />
                    </Link>
                    <br/>
                    <small>Add folder</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-pencil" />
                    </Link>
                    <br/>
                    <small>Add note</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-remove" />
                    </Link>
                    <br/>
                    <small>Remove folder</small>
                </div>
                <br/>
            </div>
        )
    }
}
