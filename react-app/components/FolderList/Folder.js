import React from "react"

export default class Folder extends React.Component {

    static propTypes = {
        folder: React.PropTypes.object.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        onFolderClick: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
    }

    render() {
        let isSelected = this.props.isSelected ? " active-folder-list" : "";
        let folderIcon = this.props.isOpen ? " glyphicon-folder-open" : " glyphicon-folder-close";

        return <li className={"element-folder-list" + isSelected} onClick={this.props.onFolderClick}>
            <span className={"glyphicon glyphicon-folder-list" + folderIcon}/>
            <span className="text-folder-list" >{this.props.folder.name}</span>
        </li>
    }
}