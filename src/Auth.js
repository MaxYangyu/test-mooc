import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'

@connect(
    state=>state.auth)

class Auth extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2>Auth</h2>
            </div>
        )
    }
}

export default Auth