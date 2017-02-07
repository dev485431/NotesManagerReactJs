import React from "react"
import {Link} from "react-router"

export default class MainMenu extends React.Component {
    static propTypes = {
        addError: React.PropTypes.func.isRequired,
        addFolder: React.PropTypes.func.isRequired,
        removeFolder: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="/addFolder">
                        <span className="glyphicon glyphicon-plus"/>
                    </Link>
                    <br/>
                    <small>Add folder</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="/addNote">
                        <span className="glyphicon glyphicon-pencil"/>
                    </Link>
                    <br/>
                    <small>Add note</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="/removeFolder">
                        <span className="glyphicon glyphicon-remove"/>
                    </Link>
                    <br/>
                    <small>Remove folder</small>
                </div>
                <br/>
            </div>
        )
    }
}
