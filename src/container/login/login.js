import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';

@connect(

)
class Login extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
    register() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem placeholder='请输入用户名'>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='请输入密码'>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login