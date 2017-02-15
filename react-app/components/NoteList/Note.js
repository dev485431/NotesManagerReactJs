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
        let isSelected = this.props.isSelected ? " active-note-list" : "";

        return <li className={"element-note-list" + isSelected} onClick={this.props.onNoteClick}>
            <span className="glyphicon glyphicon-file glyphicon-note-list"/><br/>
            <span>{this.props.note.title}</span>
        </li>
    }
}