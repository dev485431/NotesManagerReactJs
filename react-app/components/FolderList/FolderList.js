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
        let openFolders = this.state.openFolderIds.slice();
        if (folderIndex > -1) {
            openFolders.splice(folderIndex, 1)
        } else {
            openFolders.push(folderId)
        }
        this.setState(Object.assign({}, {
            openFolderIds: openFolders
        }));
    }

    getFoldersTree = () => {
        let nodes = this.props.folders.slice();
        let map = {}, roots = [];

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            node.children = [];
            map[node.id] = i;

            if (node.parentId) {
                nodes[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }

    getFolderSubTree = (folder) => {
        let folderSubTree = [];

        let isOpen = this.state.openFolderIds.indexOf(folder.id) > -1;
        folderSubTree.push(<Folder key={folder.id} folder={folder} isOpen={isOpen}
                                   onFolderClick={this.onFolderClick.bind(this, folder.id)}/>)

        if (isOpen && folder.children.length > 0) {
            let subFolders = [];
            folder.children.map(child => {
                subFolders.push(...this.getFolderSubTree(child));
            })
            folderSubTree.push(<ul key={"" + folder.id + folder.id}>{subFolders}</ul>);
        }
        return folderSubTree;
    }

    render() {
        let folderTree = [];
        this.getFoldersTree().map(folder => {
            folderTree.push(...this.getFolderSubTree(folder));
        })
        return (
            <div className="well nav">
                <ul className="list-unstyled">
                    {folderTree}
                </ul>
            </div>
        )
    }
}
