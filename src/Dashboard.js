import React, {Component} from 'react'
import {Link, BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import App from './App'

function Erying() {
    return <span>2</span>
}

function Qibinlian() {
    return <span>3</span>
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

                <div>
                    <ul>
                        <li>
                            <Link to='/Dashboard/'>1</Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/erying'>2</Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/qibinlian'>3</Link>
                        </li>
                    </ul>
                    <Route path='/Dashboard/' exact component={App}/>
                    <Route path='/Dashboard/erying' component={Erying}/>
                    <Route path='/Dashboard/qibinlian' component={Qibinlian}/>
                </div>
        )
    }
}

export default Dashboard