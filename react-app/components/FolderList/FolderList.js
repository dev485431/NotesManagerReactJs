import React from "react"
import Folder from "./Folder";

export default class FolderList extends React.Component {

    static propTypes = {
        folderList: React.PropTypes.object.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired,
        setOpenFolders: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    onFolderClick = (folderId) => {
        this.openCloseFolder(folderId);
        this.props.setActiveFolder(folderId);
    }

    openCloseFolder = (folderId) => {
        let folderIndex = this.props.folderList.openFolderIds.indexOf(folderId);
        let openFolders = this.props.folderList.openFolderIds.slice();
        if (folderIndex > -1) {
            openFolders.splice(folderIndex, 1)
        } else {
            openFolders.push(folderId)
        }
        this.props.setOpenFolders(openFolders);
    }

    getFoldersTree = () => {
        let nodes = this.props.folderList.folders.slice();
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
        let subTree = [];

        let isOpen = this.props.folderList.openFolderIds.indexOf(folder.id) > -1;
        let isSelected = folder.id === this.props.folderList.activeFolderId;

        subTree.push(<Folder key={folder.id} folder={folder} isOpen={isOpen} isSelected={isSelected}
                             onFolderClick={this.onFolderClick.bind(this, folder.id)}/>)

        if (isOpen && folder.children.length > 0) {
            let subFolders = [];
            folder.children.map(child => {
                subFolders.push(...this.getFolderSubTree(child));
            })
            subTree.push(<ul className="sublist-folder-list" key={"" + folder.id + folder.id}>{subFolders}</ul>);
        }
        return subTree;
    }

    render() {
        let folderTree = [];
        this.getFoldersTree().map(folder => {
            folderTree.push(...this.getFolderSubTree(folder));
        })
        console.log(folderTree)
        return (
            <div className="well nav">
                <ul className="list-unstyled">
                    {folderTree}
                </ul>
            </div>
        )
    }
}
