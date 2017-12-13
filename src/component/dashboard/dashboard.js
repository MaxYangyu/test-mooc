import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,TabBar} from 'antd-mobile'
import NavLink from '../navlink/navlink'


function Boss() {
    return <h1>Boss列表</h1>
}

function Genius() {
    return <h1>Genius列表</h1>
}

function Msg() {
    return <h1>Msg列表</h1>
}

function User() {
    return <h1>User列表</h1>
}


@connect(
    state => state
)


class Dashboard extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: '牛人',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type == 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,

            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,

            },
        ]
        return (
            <div>
                <NavBar mode='dark'>
                    {navList.find(v=>v.path==pathname).title}
                </NavBar>
                <NavLink data={navList}></NavLink>
            </div>

        )
    }
}

export default Dashboard