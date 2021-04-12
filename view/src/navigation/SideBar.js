import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import LatestPosts from '../components/LatestPosts'
import MainLinks from '../components/MainLinks'
import CategoryLinks from '../components/CategoryLinks'

const useStyles = makeStyles(() => ({
    ["@media (max-width: 1024px)"]: {
        sideBar: {
            display: 'none'
        }
    }

}))

const SideBar = () => {

    const classes = useStyles()

    return(
        <div className={classes.sideBar}>

            <Divider />
            
            <MainLinks />

            <Divider />

            <LatestPosts />

            <Divider />

            <CategoryLinks />

        </div>
    )
}

export default SideBar