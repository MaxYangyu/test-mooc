import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
// import {counter} from "./index.redux"
import reducers from './reducers'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// class Text extends React.Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     render() {
//         console.log(this.props);
//         return (
//             <div>text</div>
//         )
//     }
// }



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


