import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    recentPosts: {
        padding: 10,
        margin: 10
    }
})

const LatestPosts = () => {

    const classes = useStyles()

    let [recentPosts, setRecentPosts] = useState([])
    let [loading, setLoading]         = useState(true)
    let [error, setError]             = useState('')

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/posts/latest')
        .then(response => response.json())
        .then(data => {
            setRecentPosts(data)
            setLoading(false)
        })
        .catch(error => setError(error))
    },[])

    console.log(recentPosts, "recent posts")

    if (loading) {
        return(
            <>
                Loading...
            </>
        )
    } else {
        return(
            <div className={classes.recentPosts}>
            <Typography variant="h4" gutterBottom>Latest Posts</Typography>
                <List>
                    {recentPosts.map((post) => (
                        <Link to={"/posts/" + post.postId}>
                            <ListItem button key={post.postId}>
                                <ListItemText primary={post.title}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        )
    }
}

export default LatestPosts