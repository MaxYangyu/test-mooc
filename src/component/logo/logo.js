import React, {Component} from 'react'
import LogoImage from './job.png'
import './logo.css'

class Logo extends Component {
    render() {
        return (
            <div className='logo-container'>
                <img src={LogoImage}/>
            </div>
        )
    }
}

export default Logo