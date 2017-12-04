import React, {Component} from 'react';
import {connect} from 'react-redux'
import Logo from '../../component/logo/logo'

@connect(

)
class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>登录页</h2>
            </div>
        )
    }
}

export default Login