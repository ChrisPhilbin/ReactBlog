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

const ShowOnePost = (props) => {

    const classes = useStyles()

    let [post, setPost] = useState({})
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`)
        .then(response => response.json())
        .then(data => {
            setPost(data)
            setLoading(false)
        })
    },[])

    if (loading) {
        return(
            <div>
                Loading post...
            </div>
        )
    } else {
        return(
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Paper className={classes.postPaper} elevation={3}>
                        <Typography variant="h3" gutterBottom>{post.title}<br /></Typography>
                        {post.body}
                    </Paper>
                </Container>
            </div>
        )
    }
}

export default ShowOnePost