import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

//通过redux里combineReducers方法合并的reducer
import reducers from './reducers'

import {BrowserRouter, Route,  Switch} from 'react-router-dom'
/*
import Auth from './Auth'
import Dashboard from './Dashboard'
*/
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
/*效验是否登录*/
import './index.css'
import './config'
/*
import Dashboard from "./Dashboard";    //axios的拦截器 interceptors
* */

const store = createStore(reducers, compose(
    /*redux chrome插件的使用 监控所有的reducer数据的变化*/
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute> {/*效验是否登录*/}
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat/:name' component={Chat}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)


