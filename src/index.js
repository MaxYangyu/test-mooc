import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

//通过redux里combineReducers方法合并的reducer
import reducers from './reducers'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
/*
import Auth from './Auth'
import Dashboard from './Dashboard'
*/
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'/*效验是否登录*/
import './index.css'
import './config'    //axios的拦截器 interceptors

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
                <Route path='/login' exact component={Login}/>
                <Route path='/register' component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)


