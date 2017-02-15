import React from "react"

export default class Note extends React.Component {

    static propTypes = {
        note: React.PropTypes.object.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        onNoteClick: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let isSelected = this.props.isSelected ? "active-note" : "";

        return <li className={isSelected} onClick={this.props.onNoteClick}>
            <span className="glyphicon glyphicon-file glyphicon-note"/> <span
            className="text-folder-list">{this.props.note.title}</span>
        </li>
    }
}