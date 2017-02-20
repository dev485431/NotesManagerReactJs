import React from "react"
import _ from "lodash"
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import InlineEdit from 'react-edit-inline';

import {NOTE_TOOLTIP_PREVIEW_MAX} from "../../constants/appSettings"
import {NOTE_TITLE_MIN, NOTE_TITLE_MAX} from "../../constants/appSettings"


export default class Note extends React.Component {

    static propTypes = {
        note: React.PropTypes.object.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        onNoteClick: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    nameChanged = (data) => {
        this.props.updateNote(
            Object.assign({}, this.props.note, {title: data.noteName}));
    }

    render() {
        const tooltipTxt = _.truncate(this.props.note.description, {
            'length': NOTE_TOOLTIP_PREVIEW_MAX
        }).concat("...");
        const tooltip = (
            <Tooltip id="note-tooltip">
                {tooltipTxt}
            </Tooltip>
        );

        let isSelected = this.props.isSelected ? " active-note-list" : "";
        return (
            <li className={"element-note-list" + isSelected}>
                <div>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <div onClick={this.props.onNoteClick}>
                            <span className="glyphicon glyphicon-file glyphicon-note-list"/><br/>
                        </div>
                    </OverlayTrigger>
                </div>

                <div className="text-container-note-list">
                    <InlineEdit
                        activeClassName="text-input-note-list"
                        minLength={NOTE_TITLE_MIN}
                        maxLength={NOTE_TITLE_MAX}
                        text={this.props.note.title}
                        paramName="noteName"
                        change={this.nameChanged}
                    />
                </div>
            </li>

        )

    }
}