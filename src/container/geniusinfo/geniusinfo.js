import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'


@connect(
    state => state.user,
    {update}
)

class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            money: '',
            desc: '',
            avatar: '',
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })

    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    求职职位
                </InputItem>
                <InputItem onChange={(v) => this.onChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    onChange={(v) => this.onChange('desc', v)}
                    row={3}
                    autoHeight
                    labelNumber={5}
                    title='个人简介'
                />
                <WhiteSpace/>
                <Button
                    type='primary'
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        )
    }
}

export default GeniusInfo