import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import {saveFolder} from "../actions/folderList"
import {FOLDER_NAME_MIN, FOLDER_NAME_MAX, FOLDER_DESC_MIN, FOLDER_DESC_MAX} from "../constants/appSettings"


class AddFolderPage extends React.Component {

    static propTypes = {
        saveFolder: React.PropTypes.func.isRequired,
        activeFolderId: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            folderName: "",
            folderDesc: ""
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    isAddFolderButtonDisabled = () => {
        if (this.state.folderName.length < FOLDER_NAME_MIN || this.state.folderName.length > FOLDER_NAME_MAX) {
            return true;
        }
        if (this.state.folderDesc.length < FOLDER_DESC_MIN || this.state.folderDesc.length > FOLDER_DESC_MAX) {
            return true;
        }
        return !(this.state.folderName.trim() && this.state.folderDesc.trim());
    }

    addFolderAction = (e) => {
        e.preventDefault();
        if (!this.isAddFolderButtonDisabled()) {
            let activeFolderId = this.props.activeFolderId;
            this.props.saveFolder(activeFolderId, this.state.folderName);
            this.props.router.push({pathname: '/'});
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="folderName">Folder name</label>
                        <input type="text" className="form-control" id="folderName" name="folderName"
                               placeholder="Folder name" onChange={this.handleInputChange}/>
                        <small className="text-muted">
                            min {FOLDER_NAME_MIN} max {FOLDER_NAME_MAX} characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="folderDesc">Folder description</label>
                        <textarea className="form-control" id="folderDesc" name="folderDesc" rows="3"
                                  placeholder="Folder description" onChange={this.handleInputChange}/>
                        <small className="text-muted">
                            min {FOLDER_DESC_MIN} max {FOLDER_DESC_MAX} characters
                        </small>
                    </div>

                    <div className="form-group text-center">
                        <Link onClick={this.addFolderAction} disabled={this.isAddFolderButtonDisabled()}
                              className="btn btn-primary btn-search width-100"
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
            saveFolder: (parentId, name) => {
                saveFolder(parentId, name, dispatch)
            }
        }

    })(AddFolderPage)
