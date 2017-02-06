import React from "react"
import {Link} from "react-router"

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-plus"></span>
                    </Link>
                    <br/>
                    <small>Add folder</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Link>
                    <br/>
                    <small>Add note</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default" to="">
                        <span className="glyphicon glyphicon-remove"></span>
                    </Link>
                    <br/>
                    <small>Remove folder</small>
                </div>
                <br/>
            </div>
        )
    }
}
