import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter

class NavLink extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        //干掉hide为true的
        const navList = this.props.data.filter(v => !v.hide);
        const {pathname} = this.props.location;
        return (
            <div>
                <TabBar>
                    {navList.map(v => (
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLink