import React from "react"
import Autocomplete from "react-autocomplete"

import _ from "lodash"

import SearchResults from "./SearchResults"


export default class SearchForm extends React.Component {

    static propTypes = {
        notes: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            advancedSearch: false,
            isSearchResultVisible: false,
            searchResult: []
        }
    }

    handleCheckboxChange = (event) => {
        this.setState({
            advancedSearch: event.target.checked
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
            return autoCompleteItems;
        } else {
            return this.props.notes
        }
    }

    getAutocompleteItemValue = (item) => {
        return item.title
    }

    onAutocompleteChange = (event, value) => {
        this.setState({value})
    }

    onAutocompleteSelect = (value) => {
        this.setState({value});
        this.setSearchResults();
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setSearchResults();
    }

    setSearchResults = () => {
        let searchResult = this.state.advancedSearch ? this.getNotesByAdvancedSearch() : this.getNotesBySimpleSearch();
        this.setState({
            searchResult: searchResult
        });
    }

    getNotesBySimpleSearch = () => {
        return _.filter(this.props.notes, note => note.title.includes(this.state.value))
    }

    //todo: get rid of duplicated or show results in categories: byTitle, byDesc, byTags
    getNotesByAdvancedSearch = () => {
        let byNoteTile = this.getNotesBySimpleSearch();
        let byNoteTags = [];
        let byNoteDescription = [];
        this.props.notes.map(note => {
            if (note.description.includes(this.state.value)) byNoteDescription.push(note);

            for (let tag of note.tags) {
                if (tag.text.includes(this.state.value)) {
                    byNoteTags.push(note);
                    break;
                }
            }
        });
        return [...byNoteTile, ...byNoteDescription, ...byNoteTags]
    }

    renderSearchResults = () => {

    }

    render() {

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
                    <SearchResults searchResults={this.state.searchResult}
                                   isVisible={this.state.isSearchResultVisible}/>
                </div>
            </div>
        )
    }
}