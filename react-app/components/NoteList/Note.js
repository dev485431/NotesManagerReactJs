import React from "react"

export default class Note extends React.Component {

    static propTypes = {
        note: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        return <li className="active-file">
            <span className="glyphicon glyphicon-file"/> <span className="text-folder-list" >{this.props.note.title}</span>
        </li>
    }
}