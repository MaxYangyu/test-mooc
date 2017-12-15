import React, {Component} from 'react'


class Chat extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div>user: {this.props.match.params.name}</div>
        )
    }
}

export default Chat