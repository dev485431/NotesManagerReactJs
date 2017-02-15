import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {saveNote} from "../actions/noteList"
import {NOTE_TITLE_MIN, NOTE_TITLE_MAX, NOTE_DESC_MIN, NOTE_DESC_MAX} from "../constants/appSettings"


class AddNotePage extends React.Component {

    //todo
    static propTypes = {
        saveNote: React.PropTypes.func.isRequired,
        activeFolderId: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            noteTitle: "",
            noteDesc: ""
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    isAddNoteButtonDisabled = () => {
        if (this.state.noteTitle.length < NOTE_TITLE_MIN || this.state.noteTitle.length > NOTE_TITLE_MAX) {
            return true;
        }
        if (this.state.noteDesc.length < NOTE_DESC_MIN || this.state.noteDesc.length > NOTE_DESC_MAX) {
            return true;
        }
        return !(this.state.noteTitle.trim() && this.state.noteDesc.trim());
    }

    //todo
    addNoteAction = (e) => {
        e.preventDefault();
        if (!this.isAddNoteButtonDisabled()) {
            let activeFolderId = this.props.activeFolderId;
            //todo TAGS!!!
            this.props.saveNote(activeFolderId, this.state.noteTitle, this.state.noteDesc, []);
            this.props.router.push({pathname: '/'});
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Title</label>
                        <input type="text" className="form-control" id="noteTitle" name="noteTitle"
                               placeholder="Title" onChange={this.handleInputChange}/>
                        <small className="text-muted">
                            min {NOTE_TITLE_MIN} max {NOTE_TITLE_MAX} characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="noteDesc">Description</label>
                        <textarea className="form-control" id="noteDesc" name="noteDesc" rows="3"
                                  placeholder="Description" onChange={this.handleInputChange}/>
                        <small className="text-muted">
                            min {NOTE_DESC_MIN} max {NOTE_DESC_MAX} characters
                        </small>
                    </div>

                    <div className="form-group text-center">
                        <Link onClick={this.addNoteAction} disabled={this.isAddNoteButtonDisabled()}
                              className="btn btn-primary"
                              type="submit">Add</Link>

                        &nbsp;
                        <Link to="/">
                            <button type="submit" className="btn btn-default">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default connect(state => {

        // mapStateToProps
        return {
            activeFolderId: state.folderList.activeFolderId
        }

    },
    // mapDispatchToProps
    dispatch => {
        return {
            saveNote: (folderId, title, desc, tags) => {
                saveNote(folderId, title, desc, tags, dispatch)
            }
        }

    })(AddNotePage)
