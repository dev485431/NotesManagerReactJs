import React from "react"
import _ from "lodash"
import {Modal, Button} from "react-bootstrap";

import Note from "./Note";
import NoteDetails from "./NoteDetails";
import {LOADED} from "../../constants/noteListState"


export default class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.object.isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        setActiveNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            activeNote: null
        }
    }

    onNoteClick = (note) => {
        this.props.setActiveNote(note.id);
        this.openModal(note);
    }

    openModal = (note) => {
        this.setState({
            showModal: true,
            activeNote: note
        });
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    render() {
        let notes = [];
        if (this.props.noteList.status == LOADED) {
            let folderNotes = _.filter(this.props.noteList.notes, el => el.directoryId == this.props.activeFolderId);
            folderNotes.map(note => {
                let isSelected = note.id == this.props.noteList.activeNoteId;
                notes.push(
                    <Note key={note.id} note={note} isSelected={isSelected}
                          onNoteClick={this.onNoteClick.bind(this, note)}/>
                )
            })
        }

        let noteDetails = null;
        if (this.state.activeNote) {
            noteDetails = <div>
                <NoteDetails activeNote={this.state.activeNote} showModal={this.state.showModal}
                             closeModal={this.closeModal}/>
            </div>
        }

        return (
            <div>
                <div>
                    <ul className="list-inline">
                        {notes}
                    </ul>
                </div>
                {noteDetails}
            </div>
        )
    }
}
