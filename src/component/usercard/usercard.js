import React ,{Component} from 'react'
import {Card,WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types'

class UserCard extends Component{
    static propTypes ={
        userList:PropTypes.array.isRequired
    };
    render(){
        return(
            <div>
                <WhiteSpace/>
                {this.props.userList.map(v => (
                    v.avatar ?
                        (<Card key={v._id}>
                            <Card.Header
                                title={v.name}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {v.type=='boss'?<div>公司:{v.company}</div>:null}
                                {v.desc.split('\n').map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type=='boss'?<div>薪资:{v.money}</div>:null}
                            </Card.Body>
                        </Card>)
                        : null
                ))}
            </div>
        )
    }
}
export default UserCard