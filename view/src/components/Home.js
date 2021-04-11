import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: 3
    },
    paper: {
      padding: 1,
      textAlign: 'center',
      color: 'secondary',
      whiteSpace: 'nowrap',
      marginBottom: 1
    }
  }));

const Home = () => {
    const classes = useStyles()

    return(
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>Navigation</Paper>
            </Grid>

            <Grid item xs={8}>
                <Paper className={classes.paper}>Main content</Paper>
            </Grid>
        </Grid>
    )
}

export default Home