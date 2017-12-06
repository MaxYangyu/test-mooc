import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {regisger} from '../../redux/user.redux'

@connect(
    state => state.user,
    {regisger}
)

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius',
        };
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val //key要加中括号
        })
    }

    handleRegister() {
        this.props.regisger(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {/*判断是否注册 如果注册成功 跳转地址*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <List>
                    {/*错误得信息*/}
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.handleChange('name', v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type == 'genius'}
                               onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem checked={this.state.type == 'boss'}
                               onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register