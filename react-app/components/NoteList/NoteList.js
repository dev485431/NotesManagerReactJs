import React from "react"
import _ from "lodash"
import {Modal, Button} from "react-bootstrap";

import Note from "./Note";
import TagList from "../TagList";
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

    closeModal = () => {
        this.setState({showModal: false});
    }

    openModal = (note) => {
        this.setState({
            showModal: true,
            activeNote: note
        });
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
                <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}
                       onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.activeNote.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.state.activeNote.description}</p>
                        <TagList tags={this.state.activeNote.tags}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
