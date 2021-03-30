import React, { useEffect, useState } from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 1000,
    },
    postPaper: {
        padding: 10,
        margin: 10
    }
})

const ShowAllPosts = () => {

    const classes = useStyles();

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
            <>
                Loading posts...
            </>
        )
    } else {
        return(
            <div className={classes.root}>
                <Container maxWidth="lg">
                    {posts.map((post) => (
                        <Paper className={classes.postPaper} elevation={3}>
                            <Typography variant="h3" gutterBottom>{post.title}</Typography>
                            {post.body}
                        </Paper>
                    ))}
                </Container>
            </div>
        )
    }
}

export default ShowAllPosts