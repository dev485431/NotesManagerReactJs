import React from "react"
import {connect} from "react-redux"

import MainMenu from "../components/MainMenu"
import SearchForm from "../components/SearchForm"
import FileList from "../components/FileList/FileList"

import Errors from "../components/Errors"
import {removeError} from "../actions/errors"

import FolderList from "../components/FolderList/FolderList"
import {LOADED} from "../constants/folderListState"
import {fetchFolders, setActiveFolder, setOpenFolders, deleteFolder} from "../actions/folderList"

class MainPage extends React.Component {

    static propTypes = {
        errors: React.PropTypes.array,
        folderList: React.PropTypes.object.isRequired,
        removeError: React.PropTypes.func.isRequired,
        loadFolders: React.PropTypes.func.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired,
        setOpenFolders: React.PropTypes.func.isRequired,
        deleteFolder: React.PropTypes.func.isRequired
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
                    <MainMenu activeFolderId={this.props.folderList.activeFolderId}
                              deleteFolder={this.props.deleteFolder} setActiveFolder={this.props.setActiveFolder}/>
                </div>
                <div className="col-sm-4">
                    <FolderList folderList={this.props.folderList} setActiveFolder={this.props.setActiveFolder}
                                setOpenFolders={this.props.setOpenFolders}/>
                </div>
                <div className="col-sm-7">
                    <div className="row">
                        <SearchForm/>
                    </div>
                    <br/>
                    <div className="row">
                        <FileList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {

        // mapStateToProps
        return {
            errors: state.errors,
            folderList: state.folderList,
        }
    },
    // mapDispatchToProps
    dispatch => {
        return {
            removeError: (err) => {
                dispatch(removeError(err))
            },
            loadFolders: () => {
                fetchFolders(dispatch)
            },
            setActiveFolder: (folderId) => {
                dispatch(setActiveFolder(folderId))
            },
            setOpenFolders: (openFolderIds) => {
                dispatch(setOpenFolders(openFolderIds))
            },
            deleteFolder: (folderId) => {
                deleteFolder(folderId, dispatch)
            }
        }

    })(MainPage)
