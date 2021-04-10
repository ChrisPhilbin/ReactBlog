import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DisplayPost from './DisplayPost'

const useStyles = makeStyles({
    root: {
      width: '75%'
    },
    spacer: {
        height: 100,
    },
    toolbarSpacer: {
        height: 40
    },
    uiProgess: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        margin: 10
	}
})

const ShowAllPosts = () => {

    const classes = useStyles()

    let [posts, setPosts]     = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/posts')
        .then(response => response.json())
        .then(data => {
            setPosts(data)
            setLoading(false)
        })
        .catch(error => console.log(error, "something went wrong"))
    },[])

    if (loading && !posts.length) {
        return(
            <div className={classes.root}>
                <CircularProgress size={150} className={classes.uiProgess} />
            </div>
        )
    } else {
        return(
            <div className={classes.root}>
                <div className={classes.toolbarSpacer} />
                <Container maxWidth="lg">
                    {posts.map((post) => (
                        <DisplayPost post={post} />
                    ))}
                </Container>
                <div className={classes.spacer} />
            </div>
        )
    }
}

export default ShowAllPosts