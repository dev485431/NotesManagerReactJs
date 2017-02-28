import React from "react"

import SearchResultNote from "./SearchResultNote";

export default class SearchResult extends React.Component {

    static propTypes = {
        notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,
        openNoteDetailsFlag: React.PropTypes.bool.isRequired,
        openNoteDetails: React.PropTypes.func.isRequired,
        closeNoteDetails: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let resultNotes = [];
        this.props.notes.map(note => {
            resultNotes.push(
                <SearchResultNote key={note.id} note={note} activeNoteId={this.props.activeNoteId}
                                  setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}
                                  openNoteDetailsFlag={this.props.openNoteDetailsFlag}
                                  openNoteDetails={this.props.openNoteDetails}
                                  closeNoteDetails={this.props.closeNoteDetails}/>
            )
        });

        let nonEmptyResult = <div>
            <h4>Search results:</h4>
            <ul className="list-inline search-result-list">
                {resultNotes}
            </ul>
            <hr/>
        </div>;

        return this.props.notes.length > 0 ? nonEmptyResult : <div></div>;
    }
}