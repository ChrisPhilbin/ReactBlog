import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShowLoading from './ShowLoading'

const useStyles = makeStyles({
    root: {
		display: 'flex'
	},
    postLink: {

    },
    recentPosts: {
        padding: 10,
        margin: 10,
    },
    uiProgess: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        margin: 10
	}
})

const LatestPosts = () => {

    const classes = useStyles()

    let [recentPosts, setRecentPosts] = useState([])
    let [loading, setLoading]         = useState(true)
    let [error, setError]             = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/posts/latest')
        .then(response => response.json())
        .then(data => {
            setRecentPosts(data)
            setLoading(false)
        })
        .catch(error => {
            setError(true)
            console.log(error, "something went wrong")
        })
    },[])

    if (loading) {
        return(
            <ShowLoading />
        )
    } else if (error) {
            <div>
                Error, something went wrong!
            </div>
    } else {
        return(
            <div className={classes.recentPosts}>
            <Typography variant="h4" gutterBottom>Latest Posts</Typography>
                <List>
                    {recentPosts.map((post) => (
                        <Link to={"/posts/" + post.postId} className={classes.postLink} key={post.postId}>
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