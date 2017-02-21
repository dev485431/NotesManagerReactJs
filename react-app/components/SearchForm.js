import React from "react"
import {Link} from "react-router"

import Autocomplete from "react-autocomplete"

export default class SearchForm extends React.Component {

    static propTypes = {
        notes: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            advancedSearch: false,
            value: ""
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
                <form>
                    <div className="input-group">
                        <span className="input-group-addon">
                        <i className="glyphicon glyphicon-search"/>
                        </span>

                        <Autocomplete
                            value={this.state.value}
                            wrapperStyle={styles.wrapper}
                            inputProps={{className: "form-control", placeholder: "Search..."}}

                            items={this.getAutocompleteItems()}
                            getItemValue={(item) => item.title}
                            onChange={(event, value) => this.setState({value})}
                            onSelect={value => this.setState({value})}
                            renderItem={(item, isHighlighted) => (
                                <div
                                    style={isHighlighted ? styles.highlightedItem : styles.item}
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
        )
    }
}