import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

class AddFolderPage extends React.Component {

    static propTypes = {
        someObject: React.PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    isAddFolderButtonDisabled = () => {
        return false;
    }

    addFolderAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isAddFolderButtonDisabled()) {
            this.props.router.push({pathname: '/'})
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="folderName">Folder name</label>
                        <input type="text" className="form-control" id="folderName" placeholder="Folder name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="folderDesc">Folder description</label>
                        <textarea className="form-control" id="folderDesc" rows="3" placeholder="Folder description"/>
                    </div>

                    <div className="form-group text-center">
                        <Link onClick={this.addFolderAction} disabled={this.isAddFolderButtonDisabled()}
                              className="btn btn-primary btn-search width-100"
                              type="submit">Add</Link>

                        &nbsp;
                        <Link to="/">
                            <button type="submit" className="btn btn-default">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

}

// smart components are aware of the store
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(state => {

        // mapStateToProps
        // map application state to this container's props
        return {}

    },
    // mapDispatchToProps
    // when function is passed you can handle the dispatch()es of certain ACTIONS yourself
    dispatch => {
        return {}

    })(AddFolderPage)
