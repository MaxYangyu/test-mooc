import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {login} from '../../redux/user.redux'

@connect(
    state => state.user,
    {login}
)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: ''
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register() {
        this.props.history.push('/register');
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin() {
        console.log(this.state)
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                {/*判断是否登录 如果登录成功 跳转地址*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem placeholder='请输入用户名' onChange={v => this.handleChange('name', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请输入密码'
                                   onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login