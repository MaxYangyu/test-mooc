import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {regisger} from '../../redux/user.redux'
import imoocForm from '../../component/form/form'

@connect(
    state => state.user,
    {regisger}
)
@imoocForm
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    handleRegister() {
        this.props.regisger(this.props.state)
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
                    <InputItem onChange={v => this.props.handleChange('name', v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type == 'genius'}
                               onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem checked={this.props.state.type == 'boss'}
                               onChange={() => this.props.handleChange('type', 'boss')}>BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register