import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗???', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('user_id');
                    this.props.logoutSubmit()
                }
            }
        ])
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        console.log(props);
        return props.name ? (
                <div>
                    <Result
                        img={<img src={require(`../img/${props.avatar}.png`)}  style={{width: 50}} alt=""/>}
                        title={props.name}
                        message={props.type == 'boss' ? props.company : null}
                    />

                    <List renderHeader={() => '简介'}>
                        <Item
                            multipleLine
                        >
                            {props.title}
                            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                        </Item>

                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <Button type='primary' onClick={this.logout}>退出登录</Button>
                    </List>
                </div>
            )
            : <Redirect to={props.redirectTo}/>

    }
}


export default User
