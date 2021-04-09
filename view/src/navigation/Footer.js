import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    appBar: {
        alignItems: 'center',
        backgroundColor: 'Azure',
        color: 'black',
        top: 'auto',
        bottom: 0,
        zIndex: 1000,
        textAlign: 'center'
    }
})

const Footer = () => {

    const classes = useStyles() 

    return(
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
                <Typography align="center">
                    Footer text here
                </Typography>
            </Toolbar>

        </AppBar>
    )
}

export default Footer