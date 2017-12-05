import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter     //withRouter 这样写可以看到history对象
class AuthRoute extends Component {
    componentDidMount() {
        //判断 是否在登录页面/注册页面
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname; //获取地址信息
        if (publicList.indexOf(pathname) > -1) {
            return null
        }


        //获取用户的信息
        axios.get('/user/info').then(
            res => {
                if (res.status == 200) {

                    if (res.data.code == 0) {
                        //有登录信息

                    } else {
                        //没有登录信息 跳转到登录页面
                        this.props.history.push('/login')
                    }
                    console.log(res.data)
                }
            }
        )

        //是否登录 用户的type
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default AuthRoute
