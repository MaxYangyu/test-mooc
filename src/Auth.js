import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login,getUserData} from './Auth.redux'

@connect(
    state => state.auth,
    {login,getUserData}
)

class Auth extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
       this.props.getUserData()//触发react-redux里的axios方法
    }

    render() {
        return (
            <div>
                <h2>{this.props.name}-{this.props.age}</h2>
                {this.props.isAuth ? <Redirect to='./Dashboard'></Redirect> : null}
                <h2>暂无权限,请稍后</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth