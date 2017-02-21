import React from "react"
import {Link} from "react-router"
import {Modal, Button} from "react-bootstrap";

import TagList from "../TagList";
import {LOADED} from "../../constants/noteListState"

import {
    NOTE_TITLE_MIN,
    NOTE_TITLE_MAX,
    NOTE_DESC_MIN,
    NOTE_DESC_MAX,
    NOTE_TAGS_MIN,
    NOTE_TAGS_MAX
} from "../../constants/appSettings"

export default class NoteDetails extends React.Component {

    static propTypes = {
        activeNote: React.PropTypes.object.isRequired,
        showModal: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            noteTitle: this.props.activeNote.title,
            noteDesc: this.props.activeNote.description,
            noteTags: this.props.activeNote.tags
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            noteTitle: nextProps.activeNote.title,
            noteDesc: nextProps.activeNote.description,
            noteTags: nextProps.activeNote.tags
        })
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    setTags = (tags) => {
        this.setState({
            noteTags: tags
        })
    }

    updateNoteAction = (e) => {
        e.preventDefault();
        if (!this.isUpdateNoteButtonDisabled()) {
            this.props.updateNote(Object.assign({},
                this.props.activeNote,
                {
                    title: this.state.noteTitle,
                    description: this.state.noteDesc,
                    tags: this.state.noteTags
                }));
            this.props.closeModal();
        }
    }

    isUpdateNoteButtonDisabled = () => {
        return !this.state.noteTitle.trim() || !this.state.noteDesc.trim()
            || this.state.noteTitle.length < NOTE_TITLE_MIN
            || this.state.noteTitle.length > NOTE_TITLE_MAX
            || this.state.noteDesc.length < NOTE_DESC_MIN
            || this.state.noteDesc.length > NOTE_DESC_MAX
            || this.state.noteTags.length < NOTE_TAGS_MIN
            || this.state.noteTags.length > NOTE_TAGS_MAX;
    }

    render() {
        return <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.props.showModal}
                      onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{this.state.noteTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Title</label>
                        <input type="text" className="form-control" id="noteTitle" name="noteTitle"
                               placeholder="Title" onChange={this.handleInputChange}
                               value={this.state.noteTitle}/>
                        <small className="form-text text-muted">
                            min {NOTE_TITLE_MIN} max {NOTE_TITLE_MAX} characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="noteDesc">Description</label>
                        <textarea className="form-control" id="noteDesc" name="noteDesc" rows="3"
                                  placeholder="Description" onChange={this.handleInputChange}
                                  value={this.state.noteDesc}/>
                        <small className="text-muted">
                            min {NOTE_DESC_MIN} max {NOTE_DESC_MAX} characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="noteTags">Tags</label>

                        <TagList id="noteTags" name="noteTags" tags={this.state.noteTags}
                                 returnTags={this.setTags}/>
                        <small className="text-muted">
                            min {NOTE_TAGS_MIN} max {NOTE_TAGS_MAX} tags
                        </small>
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Link onClick={this.updateNoteAction} disabled={this.isUpdateNoteButtonDisabled()}
                      className="btn btn-primary"
                      type="submit">Save</Link>

                <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}
