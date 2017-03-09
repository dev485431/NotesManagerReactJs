import React from 'react';
import {Link} from "react-router"

import styles from "../../public/css/error-404.css"

export default class NotFound404 extends React.Component {

    render() {
        return (
            <div className="text-center">
                <h2>Page not found</h2><br/>
                <span className={"glyphicon glyphicon-warning-sign " + styles.glyphiconNotFound}/><br/><br/><br/>
                <Link to="/" className="btn btn-default">Go back to main page</Link>
            </div>
        )
    }

}
