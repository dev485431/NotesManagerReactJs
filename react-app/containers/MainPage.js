import React from "react"
import {connect} from "react-redux"

import MainMenu from "../components/MainMenu"
import SearchForm from "../components/SearchForm"
import FilesList from "../components/FilesList"

import Errors from "../components/Errors"
import {addError} from "../actions/errors"
import {removeError} from "../actions/errors"

import FoldersList from "../components/FoldersList"
import {addFolder} from "../actions/folders"
import {removeFolder} from "../actions/folders"

class MainPage extends React.Component {

    // prop types for components used in this container
    // basically everything from mapStateToProps
    static propTypes = {}


    constructor(props) {
        super(props);
        // do some work in constructor
        // if (this.props.hotelList.status != LOADED) {
        //     this.props.loadData(this.props.search)
        // }

    }


    // 'main' render function
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
                    <FoldersList folders={this.props.folders}/>
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
            folders: state.folders
        }

    },
    // mapDispatchToProps
    // when function is passed you can handle the dispatch()es of certain ACTIONS yourself
    dispatch => {
        return {
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
