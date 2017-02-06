import React from "react"
import {Link} from "react-router"

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-search"></i>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="Search..."/>
                </div>
            </div>
        )
    }
}