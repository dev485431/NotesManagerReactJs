import React from "react"
import _ from "lodash"
import Note from "./Note";

import {LOADED} from "../../constants/noteListState"


export default class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.object.isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        setActiveNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    onNoteClick = (noteId) => {
        this.props.setActiveNote(noteId);
    }

    render() {
        let notes = [];
        if (this.props.noteList.status == LOADED) {
            let folderNotes = _.filter(this.props.noteList.notes, el => el.directoryId == this.props.activeFolderId);
            folderNotes.map(note => {
                let isSelected = note.id == this.props.noteList.activeNoteId;
                notes.push(
                    <Note key={note.id} note={note} isSelected={isSelected} onNoteClick={this.onNoteClick.bind(this, note.id)}/>
                )
            })
        }
        return (
            <div>
                <ul className="list-unstyled">
                    {notes}
                </ul>
            </div>
        )
    }
}
