import React, {Component} from 'react'
import {connect} from 'react-redux'
import Logo from '../../component/logo/logo'

@connect(

)
class Register extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>注册页面</h2>
            </div>
        )
    }
}

export default Register