import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import LatestPosts from '../components/LatestPosts'
import MainLinks from '../components/MainLinks'
import CategoryLinks from '../components/CategoryLinks'

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
    topSpacer: {
        height: 60
    }
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
            <div className={classes.topSpacer} />

            <Divider />
            
            <MainLinks />

            <Divider />

            <LatestPosts />

            <Divider />

            <CategoryLinks />

        </Drawer>
    )
}

export default SideBar