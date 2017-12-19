import React, {Component} from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:803');

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        socket.on('recvmsg', (data) => {
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }

    handleSubmit() {
        socket.emit('sendmsg', {text: this.state.text})
        this.setState({
            text: ''
        })
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.state.msg.map(v => {
                    return <p key={v}>{v}</p>
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <span onClick={() => this.handleSubmit()}>
                                    发送
                                </span>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat