import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'lightGray',
        color: 'black',
        top: 'auto',
        bottom: 0,
        zIndex: 1000
    }
}))

const Footer = () => {

    const classes = useStyles() 

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                Footer text here
            </Toolbar>

        </AppBar>
    )
}

export default Footer