import React from "react"
import Folder from "./Folder";

import {setActiveFolder} from "../../actions/folderList"

export default class FolderList extends React.Component {

    static propTypes = {
        folders: React.PropTypes.array.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    state = {
        openFolderIds: []
    }

    // todo: push open folders if not already on the list
    setActiveFolder = (activeId) => {
        this.props.setActiveFolder(activeId);
        this.setState(Object.assign({}, {
            openFolderIds: [...self.state.openFolderIds, activeId]
        }));
    }

    render() {
        let folders = this.props.folders.map(folder => {
            return <Folder key={folder.id} folder={folder} isOpen={false}
                           onClick={() => this.setActiveFolder(folder.id)}/>
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
