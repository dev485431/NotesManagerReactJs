import React from "react"
import Folder from "./Folder";

export default class FolderList extends React.Component {

    static propTypes = {
        folders: React.PropTypes.array.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            openFolderIds: []
        }
    }

    onFolderClick = (folderId) => {
        this.changeFolderIcon(folderId);
        this.props.setActiveFolder(folderId);
    }

    changeFolderIcon = (folderId) => {
        let folderIndex = this.state.openFolderIds.indexOf(folderId);
        let folderIds = this.state.openFolderIds.slice();
        if (folderIndex > -1) {
            folderIds.splice(folderIndex, 1)
        } else {
            folderIds.push(folderId)
        }
        this.setState(Object.assign({}, {
            openFolderIds: folderIds
        }));
    }

    render() {
        let folders = this.props.folders.map(folder => {
            let isOpen = this.state.openFolderIds.indexOf(folder.id) > -1;
            return <Folder key={folder.id} folder={folder} isOpen={isOpen}
                           onFolderClick={this.onFolderClick.bind(this, folder.id)}/>
        })

        return (
            <div className="well nav">
                <ul className="list-unstyled">
                    {folders}
                </ul>
            </div>
        )
    }
}
