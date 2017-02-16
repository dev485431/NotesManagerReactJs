import React from "react"
import _ from "lodash"
import {OverlayTrigger, Tooltip} from "react-bootstrap";

import {NOTE_TOOLTIP_MAX} from "../../constants/appSettings"

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
        const tooltipTxt = _.truncate(note.description, {
            'length': NOTE_TOOLTIP_MAX
        }).concat("...");
        const tooltip = (
            <Tooltip id="modal-tooltip">
                {tooltipTxt}
            </Tooltip>
        );

        let isSelected = this.props.isSelected ? " active-note-list" : "";
        return (
            <OverlayTrigger placement="top" overlay={tooltip}>
                <li>
                    <div className={"element-note-list" + isSelected} onClick={this.props.onNoteClick}>
                        <span className="glyphicon glyphicon-file glyphicon-note-list"/><br/>
                        <span>{note.title}</span>
                    </div>
                </li>
            </OverlayTrigger>
        )

    }
}