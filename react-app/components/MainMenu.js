import React from "react"
import {Link} from "react-router"
import _ from "lodash"

import {ROOT_FOLDER_ID} from "../constants/appSettings"

export default class MainMenu extends React.Component {

    static propTypes = {
        folders: React.PropTypes.array.isRequired,
        activeFolderId: React.PropTypes.number.isRequired,
        deleteFolders: React.PropTypes.func.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired,

        notes: React.PropTypes.array.isRequired,
        activeNoteId: React.PropTypes.number,
        deleteNotes: React.PropTypes.func.isRequired,
        setActiveNote: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    isRemoveFolderButtonDisabled = () => {
        return !this.props.activeFolderId || this.props.activeFolderId === ROOT_FOLDER_ID;
    }

    isRemoveNoteButtonDisabled = () => {
        return !this.props.activeNoteId;
    }

    removeFolder = () => {
        let removedFolderIds = [this.props.activeFolderId, ...this.getSubFoldersIds(this.props.activeFolderId)];
        this.props.deleteFolders(removedFolderIds);
        this.props.setActiveFolder(ROOT_FOLDER_ID);
        this.props.deleteNotes(this.getSubNotesIds(removedFolderIds));
        this.props.setActiveNote(null);
    }

    removeNote = () => {
        this.props.deleteNotes([this.props.activeNoteId]);
        this.props.setActiveNote(null);
    }

    getSubFoldersIds = (folderId) => {
        let subFolderIds = [];
        let subFolders = _.filter(this.props.folders, el => el.parentId == folderId);
        subFolders.map(folder => {
            subFolderIds.push(folder.id);
        })

        subFolderIds.map(childId => subFolderIds.push(...this.getSubFoldersIds(childId)));
        return subFolderIds;
    }

    getSubNotesIds = (folderIds) => {
        let subNotesIds = [];
        let subNotes = _.filter(this.props.notes, el => folderIds.includes(el.directoryId));
        subNotes.map(subNote => {
            subNotesIds.push(subNote.id)
        })
        return subNotesIds;
    }

    render() {
        let disableRemoveFolderBtn = this.isRemoveFolderButtonDisabled() ? " disabled" : "";
        let disableRemoveNoteBtn = this.isRemoveNoteButtonDisabled() ? " disabled" : "";

        return (
            <div>
                <div className="row text-center">
                    <Link className="btn btn-lg btn-default button-main-menu" to="/addFolder">
                        <span className="glyphicon glyphicon-plus glyphicon-main-menu"/>
                    </Link>
                    <br/>
                    <small>Add folder</small>
                </div>
                <br/>

                <div className="row text-center">
                    <Link className="btn btn-lg btn-default button-main-menu" to="/addNote">
                        <span className="glyphicon glyphicon-pencil glyphicon-main-menu"/>
                    </Link>
                    <br/>
                    <small>Add note</small>
                </div>
                <br/>

                <div className="row text-center">
                    <a className={"btn btn-lg btn-default button-main-menu" + disableRemoveFolderBtn}
                          onClick={this.removeFolder}>
                        <span className="glyphicon glyphicon-remove glyphicon-main-menu"/>
                    </a>
                    <br/>
                    <small>Remove folder</small>
                </div>
                <br/>

                <div className="row text-center">
                    <a className={"btn btn-lg btn-default button-main-menu" + disableRemoveNoteBtn}
                          onClick={this.removeNote}>
                        <span className="glyphicon glyphicon-remove-circle glyphicon-main-menu"/>
                    </a>
                    <br/>
                    <small>Remove file</small>
                </div>
            </div>
        )
    }
}
