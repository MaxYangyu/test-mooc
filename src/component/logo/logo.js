import React, {Component} from 'react'
import {connect} from 'react-redux'
import LogoImage from './job.png'
import './logo.css'
@connect(

)
class Logo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='logo-container'>
                <img src={LogoImage}/>
            </div>
        )
    }
}

export default Logo