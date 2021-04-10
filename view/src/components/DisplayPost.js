import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    postPaper: {
        padding: 10,
        marginBottom: 45,
        fontFamily: 'arial'
    },
    postTitle: {
        fontWeight: 'bold'
    },
    subTitle: {
        fontWeight: 'bold'
    },
})

const DisplayPost = (props) => {

    const post = props.post

    const classes = useStyles()

    const maxLength = 350

    const formatPost = (post) => {    
        let shortenedPost = post.body.substring(0,maxLength)
        return(
            <div>
            {shortenedPost} <Link to={`/posts/${post.postId}`}> ...Read more</Link>
            </div>
        )
    }

    return(
        <Paper key={post.postId} className={classes.postPaper} elevation={3}>
            <Typography variant="h5" gutterBottom className={classes.postTitle}><Link to={"/posts/" + post.postId}>{post.title}</Link></Typography>
            {post.category ? <span className={classes.subTitle}><em>Posted in {post.category} - {moment(post.createdAt).format('LL')}<br /><br /></em></span> : null }
            {post.body.length >= maxLength ? formatPost(post) : post.body}
        </Paper>
    )
}

export default DisplayPost