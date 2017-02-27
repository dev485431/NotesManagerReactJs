import React from "react"

export default class Errors extends React.Component {
    static propTypes = {
        errors: React.PropTypes.arrayOf(React.PropTypes.string),
        clearError: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    removeError(err) {
        let self = this;
        setTimeout(function () {
            self.props.clearError(err)
        }, 5000)
    }

    render() {
        let errs = this.props.errors.map((el, key) => {
            this.removeError(el);
            return <div key={key}>{el}</div>
        })
        return (
            errs.length ? <div className="alert alert-danger">{errs}</div> : <span/>
        )
    }
}