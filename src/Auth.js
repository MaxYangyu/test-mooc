import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import axios from 'axios'

@connect(
    state => state.auth,
    {login}
)

class Auth extends Component {
    componentWillMount() {
        axios.get('/data').then(res => console.log(res))
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {this.props.isAuth ? <Redirect to='./Dashboard'></Redirect> : null}
                <h2>暂无权限,请稍后</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth