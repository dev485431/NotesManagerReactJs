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
            return '<li>' + folder.id + '</li>';
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
