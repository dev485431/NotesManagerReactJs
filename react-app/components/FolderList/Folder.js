import React from "react"
import InlineEdit from 'react-edit-inline';

import {FOLDER_NAME_MIN, FOLDER_NAME_MAX} from "../../constants/appSettings"

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
        this.props.updateFolder({
            name: data.folderName,
            id: this.props.folder.id,
            parentId: this.props.folder.parentId
        });
    }

    render() {
        let isSelected = this.props.isSelected ? " active-folder-list" : "";
        let folderIcon = this.props.isOpen ? " glyphicon-folder-open" : " glyphicon-folder-close";

        return <li className={"element-folder-list" + isSelected}>
            <span className={"glyphicon glyphicon-folder-list" + folderIcon} onClick={this.props.onFolderClick}/>

            <InlineEdit
                className="text-folder-list"
                activeClassName="text-folder-list-editing"
                minLength={FOLDER_NAME_MIN}
                maxLength={FOLDER_NAME_MAX}
                text={this.props.folder.name}
                paramName="folderName"
                change={this.nameChanged}
            />
        </li>
    }
}