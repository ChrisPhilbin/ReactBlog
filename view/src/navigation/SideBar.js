import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import LatestPosts from '../components/LatestPosts'
import MainLinks from '../components/MainLinks'

const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        backgroundColor: 'Azure',
        width: drawerWidth,
    },
}))

const SideBar = () => {

    const classes = useStyles()

    return(
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="right"
        >

        <Divider />
        
        <MainLinks />

        <Divider />

        <LatestPosts />

        </Drawer>
    )
}

export default SideBar