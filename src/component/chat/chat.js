import React, {Component} from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import io from 'socket.io-client'

const socket = io('ws://localhost:803');

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        //对方的_id
        const to = this.props.match.params.name;
        this.props.readMsg(to)
    }

    componentWillUnmount() {
        const to = this.props.match.params.name;
        this.props.readMsg(to)
    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }


    handleSubmit() {
        /*  socket.emit('sendmsg', {text: this.state.text})*/
        /*  this.setState({
             text: ''
         })*/
        const from = this.props.user._id;
        const to = this.props.match.params.name;
        const msg = this.state.text;
        this.props.sendMsg(from, to, msg);
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ').filter(v => v).map(v => ({text: v}));

        const name = this.props.match.params.name;
        const users = this.props.chat.users;
        if (!users[name]) {
            return null
        }
        const chatid = getChatId(name, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[name].name}
                </NavBar>
                {chatmsg.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from == name ? (
                        <List key={v._id}>
                            <List.Item
                                thumb={avatar}
                            >{v.content}</List.Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <List.Item
                                extra={<img src={avatar}/>}
                                className='chat-me'>
                                {v.content}
                            </List.Item>
                        </List>
                    )
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
                                <div>
                                    <span style={{marginRight: 15}}
                                          onClick={() => {
                                              this.setState({
                                                  showEmoji: !this.state.showEmoji
                                              });
                                              this.fixCarousel();
                                          }
                                          }>😃</span>
                                    <span onClick={() => this.handleSubmit()}>
                                         发送
                                     </span>
                                </div>

                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }
                            }
                        /> : null}
                </div>
            </div>
        )
    }
}

export default Chat