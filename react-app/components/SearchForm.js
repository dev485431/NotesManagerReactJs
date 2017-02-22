import React from "react"
import Autocomplete from "react-autocomplete"

import _ from "lodash"

import SearchResult from "./SearchResult"

export default class SearchForm extends React.Component {

    static propTypes = {
        notes: React.PropTypes.array.isRequired,
        activeNoteId: React.PropTypes.number,
        setActiveNote: React.PropTypes.func.isRequired,
        updateNote: React.PropTypes.func.isRequired,
        searchResult: React.PropTypes.array.isRequired,
        setSearchResult: React.PropTypes.func.isRequired,
        clearSearchResult: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            advancedSearch: false,
        }
    }

    handleCheckboxChange = (event) => {
        this.setState({
            advancedSearch: event.target.checked
        }, () => {
            this.setSearchResults()
        });
    }

    getAutocompleteItems = () => {
        if (this.state.advancedSearch) {
            let autoCompleteItems = this.props.notes.slice();
            this.props.notes.map(note => {
                note.tags.map(tag => {
                    autoCompleteItems.push({
                        title: tag.text
                    })
                })
            });
            return _.uniqBy(autoCompleteItems, (item) => {
                return item.title
            })
        } else {
            return _.uniqBy(this.props.notes, (item) => {
                return item.title
            })
        }
    }

    getAutocompleteItemValue = (item) => {
        return item.title
    }

    onAutocompleteChange = (event, value) => {
        this.setState({value})
    }

    onAutocompleteSelect = (value) => {
        this.setState({value}, () => {
            this.setSearchResults()
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setSearchResults();
    }

    resetFormInput = () => {
        this.setState({
            value: "",
        });
        this.props.clearSearchResult();
    }

    setSearchResults = () => {
        let searchResult = this.state.advancedSearch ? this.getNotesByAdvancedSearch() : this.getNotesBySimpleSearch();
        this.props.setSearchResult(searchResult);
    }

    getNotesBySimpleSearch = () => {
        return this.state.value.trim().length !== 0 ? _.filter(this.props.notes, note => _.includes(note.title, this.state.value)) : [];
    }

    getNotesByAdvancedSearch = () => {
        if (this.state.value.trim().length !== 0) {
            let byNoteTitle = this.getNotesBySimpleSearch();
            let byNoteDescription = [];
            let byNoteTags = [];
            this.props.notes.map(note => {
                if (_.includes(note.description, this.state.value)) byNoteDescription.push(note);

                for (let tag of note.tags) {
                    if (_.includes(tag.text, this.state.value)) {
                        byNoteTags.push(note);
                        break;
                    }
                }
            });
            return _.uniqBy([...byNoteTitle, ...byNoteDescription, ...byNoteTags], (note) => {
                return note.id
            })
        } else {
            return [];
        }
    }

    render() {

        //todo: export to css modules
        const styles = {
            item: {
                padding: '2px 6px',
                cursor: 'default'
            },

            highlightedItem: {
                color: 'white',
                background: 'hsl(200, 50%, 50%)',
                padding: '2px 6px',
                cursor: 'default'
            },

            menu: {
                border: 'solid 1px #ccc'
            },

            wrapper: {
                position: 'relative',
                display: 'table',
                borderCollapse: 'separate',
                zIndex: '2',
                float: 'left',
                width: '100%',
                marginBottom: '0'
            }
        };


        return (
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="input-group">
                        <span className="input-group-addon">
                        <i className="glyphicon glyphicon-search"/>
                        </span>

                            <Autocomplete
                                value={this.state.value}
                                wrapperStyle={styles.wrapper}
                                inputProps={{className: "form-control", placeholder: "Search..."}}
                                items={this.getAutocompleteItems()}
                                getItemValue={(item) => this.getAutocompleteItemValue(item)}
                                onChange={(event, value) => this.onAutocompleteChange(event, value)}
                                onSelect={value => this.onAutocompleteSelect(value)}
                                renderItem={(item, isHighlighted) => (
                                    <div style={isHighlighted ? styles.highlightedItem : styles.item}
                                         key={item.id}
                                    >{item.title}</div>
                                )}
                            />

                            <a className="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear search-from-reset"
                               onClick={this.resetFormInput}/>
                        </div>

                        <div className="form-check pull-right">
                            <label className="form-check-label">
                                <input id="advancedSearch" name="advancedSearch"
                                       className="form-check-input"
                                       type="checkbox"
                                       onChange={this.handleCheckboxChange}/>
                                Advanced search
                            </label>
                        </div>

                    </form>
                </div>

                <div className="row">
                    <SearchResult notes={this.props.searchResult} activeNoteId={this.props.activeNoteId}
                                  setActiveNote={this.props.setActiveNote} updateNote={this.props.updateNote}/>
                </div>
            </div>
        )
    }
}