import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        color: 'lightGray',
        width: '100%',
        textAlign: 'center',
        paddingTop: 75,
        paddingBottom: 30,
        position: 'static'
    }
})

const Footer = () => {

    const classes = useStyles() 

    return(
        <div className={classes.root}>
            <Typography>
                &copy; {new Date().getFullYear()} Chris Philbin
            </Typography>
        </div>
    )
}

export default Footer