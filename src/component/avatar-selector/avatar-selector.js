import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
    /*类型检查*/
    static propTypes = {
        /*isRequired为必需*/
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        setTimeout(function () {
           dispatchEvent(new Event('resize'))
        },0)
    }

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.icon ? (
                <div>
            <span>
                已选择
                <img src={this.state.icon} style={{width: 20}}/>
            </span>
                </div>)
            :
            <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        isCarousel
                        onClick={e => {
                            this.setState(e);
                            /*获取点击所在头像的text*/
                            this.props.selectAvatar(e.text);

                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector