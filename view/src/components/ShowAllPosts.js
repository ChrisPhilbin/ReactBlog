import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
      width: '75%'
    },
    postPaper: {
        padding: 10,
        marginBottom: 45,
        fontFamily: 'arial'
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

    const maxLength = 350

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

    const formatPost = (post) => {
        let shortenedPost = post.body.substring(0,maxLength)
        return(
            <div>
            {shortenedPost} <Link to={`/posts/${post.postId}`}> ...Read more</Link>
            </div>
        )
    } 

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
                        <Paper key={post.postId} className={classes.postPaper} elevation={3}>
                            <Typography variant="h3" gutterBottom><Link to={"/posts/" + post.postId}>{post.title}</Link></Typography>
                            {post.category ? <em>Posted in {post.category}<br /><br /></em> : null }
                            <em></em>
                            {post.body.length >= maxLength ? formatPost(post) : post.body}
                        </Paper>
                    ))}
                </Container>
                <div className={classes.spacer} />
            </div>
        )
    }
}

export default ShowAllPosts