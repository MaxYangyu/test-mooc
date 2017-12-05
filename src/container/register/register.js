import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'

@connect(

)

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius',

        }
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <h2>注册页面</h2>
                <List>
                    <InputItem>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password'>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password'>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type == 'genius'}>牛人</RadioItem>
                    <RadioItem checked={this.state.type == 'boss'}>BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button  type='primary'>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register