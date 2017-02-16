import React from "react"
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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
        const {note} = this.props;
        const tooltip = (
            <Tooltip id="modal-tooltip">
                {note.description}
            </Tooltip>
        );

        let isSelected = this.props.isSelected ? " active-note-list" : "";
        return (
            <OverlayTrigger placement="top" delayHide={150} overlay={tooltip}>
                <li >
                    <div className={"element-note-list" + isSelected} onClick={this.props.onNoteClick}>
                        <span className="glyphicon glyphicon-file glyphicon-note-list"/><br/>
                        <span>{note.title}</span>
                    </div>
                </li>
            </OverlayTrigger>

        )

    }
}