import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { useCheckToken } from '../hooks/customHooks'
import Typography from '@material-ui/core/Typography'

import firebase from 'firebase/app'
import environment from '../environment/environment'
import 'firebase/auth'

firebase.initializeApp(environment)

const useStyles = makeStyles({
    mainLinks: {
        padding: 10,
        margin: 10,
    },
})

const MainLinks = (props) => {

    const classes = useStyles()

    const isLoggedIn = useCheckToken()

    return(
        <div className={classes.mainLinks}>
        <Typography variant="h4" gutterBottom>Main Links</Typography>
            <List>
                <Link to="/posts/">
                    <ListItem button>
                        <ListItemText primary="Home"/>
                    </ListItem>
                </Link>

                <Link to="/static/about">
                    <ListItem button>
                        <ListItemText primary="About" />
                    </ListItem>
                </Link>

                {isLoggedIn ?
                    <>
                        <Link to="/posts/new">
                            <ListItem button>
                                <ListItemText primary="New post"/>
                            </ListItem>
                        </Link>

                        <Link to="/static/new">
                            <ListItem button>
                                <ListItemText primary="New Static Page"/>
                            </ListItem>
                        </Link>
                    </>
                    :
                    null
                }
            </List>
        </div>
    )
}

export default MainLinks