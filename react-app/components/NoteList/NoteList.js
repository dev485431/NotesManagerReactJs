import React from "react"
import _ from "lodash"
import {Modal, Button} from "react-bootstrap";
import {DragSource, DropTarget} from 'react-dnd';

import flow from 'lodash/flow';

import Note from "./Note";
import {LOADED} from "../../constants/noteListState"

//todo: export to constants
const ItemTypes = {
    NOTE: 'note'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const noteSource = {
    beginDrag(props) {
        // Return the data describing the dragged item
        const item = {id: props.id};
        return item;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        //CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

/**
 * Specifies which props to inject into your component.
 */
function collectDrag(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}


const squareTarget = {
    drop(props) {
        //moveKnight(props.x, props.y);
    }
};


function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}


class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.object.isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let notes = [];
        if (this.props.noteList.status == LOADED) {
            let folderNotes = _.filter(this.props.noteList.notes, el => el.directoryId == this.props.activeFolderId);
            folderNotes.map(note => {
                notes.push(
                    <Note key={note.id} note={note} activeNoteId={this.props.noteList.activeNoteId}
                          setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}/>
                )
            })
        }

        return (
            <div>
                <ul className="list-inline note-list">
                    {notes}
                </ul>
            </div>
        )
    }
}

//todo: ItemType in separate file?

export default flow(
    DragSource(ItemTypes.NOTE, noteSource, collectDrag),
    DropTarget(ItemTypes.NOTE, squareTarget, collectDrop)
)(NoteList);