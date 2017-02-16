import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {NOTE_TAGS_MAX} from "../constants/appSettings"


export default class TagList extends React.Component {

    static propTypes = {
        tags: React.PropTypes.array,
        returnTags: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        let tags = this.props.tags ? this.props.tags.slice() : [];
        this.state = {
            tags: tags
        }
    }

    handleDelete = (i) => {
        let tags = this.state.tags.slice();
        tags.splice(i, 1);
        this.setState({tags: tags});
        if (this.props.returnTags) this.props.returnTags(tags);
    }

    handleAddition = (tag) => {
        if (this.state.tags.length < NOTE_TAGS_MAX) {
            let tags = this.state.tags.slice();
            //todo tags id from sth
            tags.push({
                id: tags.length + 1,
                text: tag
            });
            this.setState({tags: tags});
            if (this.props.returnTags) this.props.returnTags(tags);
        }
    }

    handleDrag = (tag, currPos, newPos) => {
        let tags = this.state.tags.slice();
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
        this.setState({tags: tags});
        if (this.props.returnTags) this.props.returnTags(tags);
    }

    render() {
        return (
            <div>
                <ReactTags tags={this.state.tags}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleDrag={this.handleDrag}/>
            </div>
        )
    }

}
