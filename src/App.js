import React, {Component} from 'react';
import {connect} from 'react-redux';
import {add, remove, addAsync} from "./index.redux";

/*

const mapStatetoProps = (state) => {
    return {num: state}
};
const actionCreators = {add, remove, addAsync};

 App = connect(mapStatetoProps,actionCreators)(App);

 */

@connect(
    state => ({num: state}),

    {add, remove, addAsync}
)

class App extends Component {
    render() {

        const num = this.props.num;
        return (
            <div>
                <h1>现在有钱{num}</h1>
                <button onClick={this.props.add}>增加</button>
                <button onClick={this.props.remove}>减少</button>
                <button onClick={this.props.addAsync}>拖2天</button>
            </div>
        )
    }
}


export default App