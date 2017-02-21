import React from "react"
import {connect} from "react-redux"

import MainMenu from "../components/MainMenu"
import SearchForm from "../components/SearchForm"
import NoteList from "../components/NoteList/NoteList"

import Errors from "../components/Errors"
import {removeError} from "../actions/errors"

import FolderList from "../components/FolderList/FolderList"
import {LOADED as FOLDERS_LOADED} from "../constants/folderListState"
import {LOADED as NOTES_LOADED} from "../constants/noteListState"
import {fetchFolders, setActiveFolder, setOpenFolders, deleteFolders, updateFolder} from "../actions/folderList"
import {fetchNotes, setActiveNote, deleteNotes, updateNote} from "../actions/noteList"


class MainPage extends React.Component {

    static propTypes = {
        errors: React.PropTypes.array,
        removeError: React.PropTypes.func.isRequired,

        folderList: React.PropTypes.object.isRequired,
        loadFolders: React.PropTypes.func.isRequired,
        setActiveFolder: React.PropTypes.func.isRequired,
        setOpenFolders: React.PropTypes.func.isRequired,
        deleteFolders: React.PropTypes.func.isRequired,
        updateFolder: React.PropTypes.func.isRequired,

        noteList: React.PropTypes.object.isRequired,
        loadNotes: React.PropTypes.func.isRequired,
        setActiveNote: React.PropTypes.func.isRequired,
        deleteNotes: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        if (this.props.folderList.status != FOLDERS_LOADED) {
            this.props.loadFolders()
        }
        if (this.props.noteList.status != NOTES_LOADED) {
            this.props.loadNotes()
        }
    }

    render() {
        const {errors, removeError, folderList, setActiveFolder, deleteFolders, setOpenFolders, noteList, setActiveNote, deleteNotes} = this.props;

        return (
            <div>
                <div className="row">
                    <Errors errors={errors} clearError={removeError}/>
                </div>
                <div className="col-sm-1">
                    <MainMenu folders={folderList.folders} activeFolderId={folderList.activeFolderId}
                              deleteFolders={deleteFolders} setActiveFolder={setActiveFolder} notes={noteList.notes}
                              activeNoteId={noteList.activeNoteId} deleteNotes={deleteNotes}
                              setActiveNote={setActiveNote}/>
                </div>
                <div className="col-sm-5">
                    <FolderList folderList={folderList} setActiveFolder={setActiveFolder}
                                setOpenFolders={setOpenFolders} setActiveNote={setActiveNote}
                                updateFolder={this.props.updateFolder}/>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <SearchForm noteList={noteList}/>
                    </div>
                    <br/>
                    <div className="row">
                        <NoteList noteList={noteList} activeFolderId={folderList.activeFolderId}
                                  setActiveNote={setActiveNote} updateNote={this.props.updateNote}/>
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
            noteList: state.noteList
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
            deleteFolders: (folderIds) => {
                deleteFolders(folderIds, dispatch)
            },
            updateFolder: (folder) => {
                updateFolder(folder, dispatch)
            },
            loadNotes: () => {
                fetchNotes(dispatch)
            },
            setActiveNote: (noteId) => {
                dispatch(setActiveNote(noteId))
            },
            deleteNotes: (noteIds) => {
                deleteNotes(noteIds, dispatch)
            },
            updateNote: (note) => {
                updateNote(note, dispatch)
            }
        }

    })(MainPage)
