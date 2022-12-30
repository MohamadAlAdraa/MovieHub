import React from 'react'
import classes from './Header.module.css';

const Header = () => {
    return (
        <div onClick={()=>window.scroll(0,0)} className={classes.Header}>
            <span>🎬 Entertainment Hub 🎥</span>
        </div>
    )
}

export default Header
