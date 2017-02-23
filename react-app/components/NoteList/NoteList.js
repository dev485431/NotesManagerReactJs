import React from "react"
import update from 'react/lib/update';
import _ from "lodash"
import {Modal, Button} from "react-bootstrap";

import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

import Note from "./Note";
import {LOADED} from "../../constants/noteListState"


class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.object.isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            notes: _.sortBy(this.props.noteList.notes, note => note.position)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            notes: _.sortBy(nextProps.noteList.notes, note => note.position)
        })
    }

    moveNote = (dragIndex, hoverIndex) => {
        const dragNote = this.state.notes[dragIndex];

        this.setState(update(this.state, {
            notes: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragNote],
                ],
            },
        }));
    }

    render() {
        let notes = [];
        if (this.props.noteList.status == LOADED) {
            let folderNotes = _.filter(this.state.notes, el => el.directoryId == this.props.activeFolderId);
            folderNotes.map(note => {
                notes.push(
                    <Note key={note.id} note={note} activeNoteId={this.props.noteList.activeNoteId}
                          setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}
                          id={note.id} index={note.position} moveNote={this.moveNote}/>
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

export default DragDropContext(HTML5Backend)(NoteList);
