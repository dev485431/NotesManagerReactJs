import React from "react"
import _ from "lodash"
import Note from "./Note";

import {LOADED} from "../../constants/noteListState"


export default class NoteList extends React.Component {

    static propTypes = {
        noteList: React.PropTypes.object.isRequired,
        activeFolderId: React.PropTypes.number.isRequired
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
                    <Note key={note.id} note={note}/>
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
