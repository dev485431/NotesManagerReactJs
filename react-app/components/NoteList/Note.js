import React from "react"
import ReactDOM from 'react-dom';
import _ from "lodash"
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import InlineEdit from 'react-edit-inline';
import {DragSource, DropTarget} from 'react-dnd';

import NoteDetails from "./NoteDetails";

import {NOTE_TOOLTIP_PREVIEW_MAX} from "../../constants/appSettings"
import {NOTE_TITLE_MIN, NOTE_TITLE_MAX} from "../../constants/appSettings"

import styles from "../../../public/css/note-list.css"

const ItemTypes = {
    NOTE: 'note',
};

const noteSource = {
    beginDrag(props) {
        return {
            id: props.note.id,
            index: props.note.position,
        };
    }
};

const noteTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.note.position;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        //move left only when dragged on the left side of hovered element
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return;
        }
        //move right only when dragged on the right side of hovered element
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return;
        }

        props.moveNote(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },

    drop(props) {
        props.saveNotesPosition()
    }
};

class Note extends React.Component {

    static propTypes = {
        note: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            directoryId: React.PropTypes.number.isRequired,
            position: React.PropTypes.number.isRequired,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            tags: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        }).isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,
        openNoteDetailsFlag: React.PropTypes.bool.isRequired,
        openNoteDetails: React.PropTypes.func.isRequired,
        closeNoteDetails: React.PropTypes.func.isRequired,
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        moveNote: React.PropTypes.func.isRequired,
        saveNotesPosition: React.PropTypes.func.isRequired
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

        const {isDragging, connectDragSource, connectDropTarget} = this.props;

        let selectedClass = isActiveNote ? " " + styles.activeNote : "";
        let draggedClass = isDragging ? " " + styles.draggedNote : "";
        return connectDragSource(connectDropTarget((
            <li className={styles.element + selectedClass + draggedClass}>
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
        )));

    }
}

export default _.flow([
    DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),
    DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    }))]
)(Note);