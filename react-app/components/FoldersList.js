import React from "react"

export default class FoldersList extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        folders: React.PropTypes.array.isRequired
    }

    render() {
        let folders = this.props.folders.map(folder => {
            return <li key={folder.id}>{folder.name}</li>;
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
