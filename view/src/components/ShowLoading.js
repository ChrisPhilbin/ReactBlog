import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    uiProgess: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        margin: 10
	}
})

const ShowLoading = () => {

    const classes = useStyles()
    
    return(
        <div className={classes.root}>
            <CircularProgress size={150} className={classes.uiProgess} />
        </div>
    )
}

export default ShowLoading