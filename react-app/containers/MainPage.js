import React from "react"
import {connect} from "react-redux"

import MainMenu from "../components/MainMenu"
import SearchForm from "../components/SearchForm"
import FilesList from "../components/FilesList"

import Errors from "../components/Errors"
import {addError} from "../actions/errors"
import {removeError} from "../actions/errors"

import {LOADED} from "../constants/folderListState"
import {fetchFolders} from "../actions/folderList"
import FoldersList from "../components/FoldersList"
import {addFolder, removeFolder} from "../actions/folderList"

class MainPage extends React.Component {

    static propTypes = {
        folderList: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        if (this.props.folderList.status != LOADED) {
            this.props.loadFolders()
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Errors errors={this.props.errors} clearError={this.props.removeError}/>
                </div>
                <div className="col-sm-1">
                    <MainMenu addError={this.props.addError} addFolder={this.props.addFolder}
                              removeFolder={this.props.removeFolder}/>
                </div>
                <div className="col-sm-4">
                    <FoldersList folders={this.props.folderList.folders}/>
                </div>
                <div className="col-sm-7">
                    <div className="row">
                        <SearchForm/>
                    </div>
                    <br/>
                    <div className="row">
                        <FilesList />
                    </div>
                </div>
            </div>
        )
    }

}


// smart components are aware of the store
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// containers = take their props directly from the state
export default connect(state => {

        // mapStateToProps
        // map application state to this container's props
        return {
            errors: state.errors,
            folderList: state.folderList
        }

    },
    // mapDispatchToProps
    // when function is passed you can handle the dispatch()es of certain ACTIONS yourself
    dispatch => {
        return {
            loadFolders: () => {
                fetchFolders(dispatch)
            },
            addError: (err) => {
                dispatch(addError(err))
            },
            removeError: (err) => {
                dispatch(removeError(err))
            },
            addFolder: (folder) => {
                dispatch(addFolder(folder))
            },
            removeFolder: (folder) => {
                dispatch(removeFolder(folder))
            }
        }

    })(MainPage)
