import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import reducers from './reducers' //通过redux里combineReducers方法合并的reducer
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import './config' //axios的拦截器 interceptors

const store = createStore(reducers, compose(
    /*redux chrome插件的使用 监控所有的reducer数据的变化*/
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*只渲染命中的第一个Route*/}
                <Route path='/login' exact component={Auth}/>
                <Route path='/Dashboard' component={Dashboard}/>
                <Redirect to='/Dashboard'></Redirect> {/*自动跳转*/}
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)


