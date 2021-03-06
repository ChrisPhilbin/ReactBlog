import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles'

import SideBar from '../navigation/SideBar'
import ShowAllPosts from '../components/ShowAllPosts'
import CreateNewPost from './CreateOrEditPost'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    container: {
      display: 'grid',
      gridGap: 1
    },
    paper: {
      padding: 1,
      color: 'secondary',
      marginBottom: 1
    }
  })

const Home = () => {
    const classes = useStyles()

    let [render, setRender] = useState('showAllPosts')

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper className={classes.paper} elevation={0}>
                        <SideBar setRender={setRender}/>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9} lg={9}>
                    <Paper className={classes.paper} elevation={0}>
                    {
						{
							'newPost': <CreateNewPost />,
							'showAllPosts': <ShowAllPosts />
						}[render] || <ShowAllPosts />
					}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home