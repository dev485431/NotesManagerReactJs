import React from "react"

import Note from "../components/NoteList/Note";

export default class SearchResult extends React.Component {

    static propTypes = {
        notes: React.PropTypes.array.isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.notes)

        let resultNotes = [];
        this.props.notes.map(note => {
            resultNotes.push(
                <Note key={note.id} note={note} activeNoteId={this.props.activeNoteId}
                      setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}/>
            )
        });

        return <div>
            {resultNotes}
        </div>
    }
}