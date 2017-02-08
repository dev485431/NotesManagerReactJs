import React from "react"

export default class Folder extends React.Component {

    static propTypes = {
        folder: React.PropTypes.object.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
    }

    render() {
        let folderIcon = this.props.isOpen ? "glyphicon glyphicon-folder-open" : "glyphicon glyphicon-folder-close";

        return <li onClick={this.props.onClick}>
            <span className={folderIcon}/> {this.props.folder.name}
        </li>
    }
}