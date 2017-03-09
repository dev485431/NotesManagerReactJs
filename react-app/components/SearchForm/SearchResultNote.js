import React from "react"
import _ from "lodash"
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import InlineEdit from 'react-edit-inline';

import NoteDetails from "../NoteList/NoteDetails";

import {NOTE_TOOLTIP_PREVIEW_MAX} from "../../constants/appSettings"
import {NOTE_TITLE_MIN, NOTE_TITLE_MAX} from "../../constants/appSettings"

import styles from "../../../public/css/note-list.css"

export default class SearchResult extends React.Component {

    static propTypes = {
        note: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            directoryId: React.PropTypes.number.isRequired,
            position: React.PropTypes.number.isRequired,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            tags: React.PropTypes.arrayOf(React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                text: React.PropTypes.string.isRequired
            })).isRequired
        }).isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,
        openNoteDetailsFlag: React.PropTypes.bool.isRequired,
        openNoteDetails: React.PropTypes.func.isRequired,
        closeNoteDetails: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
    }

    onNoteClick = () => {
        this.props.setActiveNote(this.props.note.id);
        this.props.openNoteDetails();
    }

    closeModal = () => {
        this.props.closeNoteDetails();
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

        let isActiveNote = this.props.note.id === this.props.activeNoteId;
        let noteDetails = null;
        if (isActiveNote) {
            noteDetails = <div>
                <NoteDetails note={this.props.note} showModal={this.props.openNoteDetailsFlag}
                             closeModal={this.closeModal} updateNote={this.props.updateNote}/>
            </div>
        }

        let selectedClass = isActiveNote ? " " + styles.activeNote : "";
        return (
            <li className={styles.element + selectedClass}>
                <div>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <div onClick={this.onNoteClick}>
                            <span className={"glyphicon glyphicon-file " + styles.noteIcon}/><br/>
                        </div>
                    </OverlayTrigger>
                </div>

                <div className={styles.textContainer}>
                    <InlineEdit
                        activeClassName={styles.textInput}
                        minLength={NOTE_TITLE_MIN}
                        maxLength={NOTE_TITLE_MAX}
                        text={this.props.note.title}
                        paramName="noteName"
                        change={this.nameChanged}
                    />
                </div>
                {noteDetails}
            </li>
        );

    }
}
