import React from "react"
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
        closeModal: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            noteTitle: this.props.activeNote.title,
            noteDesc: this.props.activeNote.description,
            noteTags: this.props.activeNote.tags
        };
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
                                  placeholder="Description" onChange={this.handleInputChange}>
                            {this.state.noteDesc}
                        </textarea>
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
                <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}
