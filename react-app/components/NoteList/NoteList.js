import React from "react"
import update from 'react/lib/update';
import _ from "lodash"
import {Modal, Button} from "react-bootstrap";

import Note from "./Note";
import {LOADED} from "../../constants/noteListState"


export default class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.shape({
            notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            status: React.PropTypes.string.isRequired,
            activeNoteId: React.PropTypes.number
        }).isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,
        updateNotes: React.PropTypes.func.isRequired,
        openNoteDetailsFlag: React.PropTypes.bool.isRequired,
        openNoteDetails: React.PropTypes.func.isRequired,
        closeNoteDetails: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            notes: this.props.noteList.notes.slice()
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('new props')
        this.setState({
            notes: nextProps.noteList.notes.slice()
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

    saveNotesPosition = () => {
        let updatedNotes = [];
        this.state.notes.map(note => {
            let newPosition = this.state.notes.indexOf(note);
            updatedNotes.push(_.assign({}, note, {position: newPosition}))
        })
        this.props.updateNotes(updatedNotes)
    }

    render() {
        let notes = [];
        if (this.props.noteList.status === LOADED) {
            let folderNotes = _.filter(this.state.notes, el => el.directoryId === this.props.activeFolderId);
            folderNotes.map(note => {
                notes.push(
                    <Note key={note.id} note={note} activeNoteId={this.props.noteList.activeNoteId}
                          setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}
                          moveNote={this.moveNote} saveNotesPosition={this.saveNotesPosition}
                          openNoteDetailsFlag={this.props.openNoteDetailsFlag}
                          openNoteDetails={this.props.openNoteDetails} closeNoteDetails={this.props.closeNoteDetails}/>
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
