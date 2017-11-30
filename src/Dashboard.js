import React, {Component} from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
import App from './App'

function Erying() {
    return <span>2</span>
}

function Qibinlian() {
    return <span>3</span>
}

@connect(
    state => state.auth,
    {logout}
)

class Dashboard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.match);
        const match =this.props.match;
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>1</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>2</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinlian`}>3</Link>
                    </li>
                </ul>
                <Route path={`${match.url}`} exact component={App}/>
                <Route path={`${match.url}/erying`} component={Erying}/>
                <Route path={`${match.url}/qibinlian`} component={Qibinlian}/>
            </div>
        )
        return (
            this.props.isAuth ? app : redirectToLogin
        )
    }
}

export default Dashboard