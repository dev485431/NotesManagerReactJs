import React from "react"
import {Modal, Button} from "react-bootstrap";

import TagList from "../TagList";
import {LOADED} from "../../constants/noteListState"


export default class NoteDetails extends React.Component {

    static propTypes = {
        activeNote: React.PropTypes.object.isRequired,
        showModal: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        return <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.props.showModal}
                      onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.activeNote.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{this.props.activeNote.description}</p>
                <TagList tags={this.props.activeNote.tags}/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}
