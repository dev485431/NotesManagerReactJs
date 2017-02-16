import React from "react"
import {Button} from "react-bootstrap";

export default class Tag extends React.Component {

    static propTypes = {
        text: React.PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        return <Button bsStyle="primary" bsSize="large">
            {this.props.text}
        </Button>
    }
}