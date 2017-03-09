import React from "react"
import InlineEdit from 'react-edit-inline';

import {FOLDER_NAME_MIN, FOLDER_NAME_MAX} from "../../constants/appSettings"

import styles from "../../../public/css/folder-list.css"

export default class Folder extends React.Component {

    static propTypes = {
        folder: React.PropTypes.object.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        onFolderClick: React.PropTypes.func.isRequired,
        updateFolder: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    nameChanged = (data) => {
        this.props.updateFolder(Object.assign({}, this.props.folder, {name: data.folderName}));
    }

    render() {
        let isSelected = this.props.isSelected ? " " + styles.activeFolder : "";
        let folderIcon = this.props.isOpen ? " glyphicon-folder-open" : " glyphicon-folder-close";

        return <li className={styles.folder + isSelected}>
            <span className={"glyphicon " + styles.glyphiconFolder + folderIcon} onClick={this.props.onFolderClick}/>

            <InlineEdit
                className={styles.folderText}
                activeClassName={styles.folderTextEditing}
                minLength={FOLDER_NAME_MIN}
                maxLength={FOLDER_NAME_MAX}
                text={this.props.folder.name}
                paramName="folderName"
                change={this.nameChanged}
            />
        </li>
    }
}