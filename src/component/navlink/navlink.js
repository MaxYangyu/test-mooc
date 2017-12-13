import React, {Component} from 'react'
import PropTypes from 'prop-types'


class NavLink extends Component {
    static PropTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                底部组件
            </div>
        )
    }
}

export default NavLink