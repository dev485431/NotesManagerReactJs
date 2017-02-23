import React from "react"
import ReactDOM from 'react-dom';
import _ from "lodash"
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import InlineEdit from 'react-edit-inline';

import {DragSource, DropTarget} from 'react-dnd';

import NoteDetails from "./NoteDetails";

import {NOTE_TOOLTIP_PREVIEW_MAX} from "../../constants/appSettings"
import {NOTE_TITLE_MIN, NOTE_TITLE_MAX} from "../../constants/appSettings"


const ItemTypes = {
    NOTE: 'note',
};

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const noteTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        console.log(hoverIndex)

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        //move left only when dragged on the left of hover
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return;
        }
        //move right only when dragged on the right of hover
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return;
        }

        props.moveNote(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};

class Note extends React.Component {

    static propTypes = {
        note: React.PropTypes.object.isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,

        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        index: React.PropTypes.number.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        id: React.PropTypes.any.isRequired,
        moveNote: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            showDetails: false
        }
    }

    onNoteClick = () => {
        this.props.setActiveNote(this.props.note.id);
        this.setState({
            showDetails: true
        });
    }

    closeModal = () => {
        this.setState({
            showDetails: false
        });
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
                <NoteDetails note={this.props.note} showModal={this.state.showDetails}
                             closeModal={this.closeModal} updateNote={this.props.updateNote}/>
            </div>
        }

        const {isDragging, connectDragSource, connectDropTarget} = this.props;
        const opacity = isDragging ? 0 : 1;

        let selectedClass = isActiveNote ? " active-note-list" : "";
        return connectDragSource(connectDropTarget((
            <li className={"element-note-list" + selectedClass}>
                <div>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <div onClick={this.onNoteClick}>
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