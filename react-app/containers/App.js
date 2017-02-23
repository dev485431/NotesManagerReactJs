import React from "react"
import {Router, Route, hashHistory} from "react-router"
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {createStore, combineReducers} from 'redux'
import * as reducers from "../reducers"

import {DragDropContext} from 'react-dnd';

import MainPage from "./MainPage"
import AddFolderPage from "./AddFolderPage"
import AddNotePage from "./AddNotePage"

// function without params to get initial/preloaded state and pass to the store
// there should be reducers for each initial state object's keys !!!
// otherwise keys will be ignored and not put into the state
let getInitState = () => {

}

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    getInitState(),
    //todo: remove in final version
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    // routes for particular views/containers
    //  tell the router to use our enhanced history
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={MainPage}/>
                    <Route path="/addFolder" component={AddFolderPage}/>
                    <Route path="/addNote" component={AddNotePage}/>
                </Router>
            </Provider>
        )
    }
}

//todo: react dnd context
export default DragDropContext()(App);
