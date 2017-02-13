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
        let isSelected = this.props.isSelected ? "active-folder" : "";
        let folderIcon = this.props.isOpen ? "glyphicon glyphicon-folder-open" : "glyphicon glyphicon-folder-close";

        return <li className={isSelected} onClick={this.props.onFolderClick}>
            <span className={folderIcon}/> {this.props.folder.name}
        </li>
    }
}