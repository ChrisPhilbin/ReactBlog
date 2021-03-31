import React, { useEffect, useState } from 'react'

import Container from '@material-ui/core/Container'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    postIcons: {
        position: 'relative',
        float: 'right',
        right: 0,
        top: 0
    },
    root: {
      width: '100%',
      maxWidth: 1000,
    },
    postPaper: {
        position: 'relative',
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

    const handleDelete = () => {
        if (window.confirm("Are you sure?")) {

            let deletedPost = {
                postId: props.match.params.postId
            }

            fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`, {
                method: 'delete',
                body: JSON.stringify(deletedPost),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Deleted!")
                }
            })
        }
    }

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
                        <div className={classes.postIcons}>
                            <IconButton
                                color="primary"
                                aria-label="Add a new reply"
                                href={`/posts/${props.match.params.postId}/edit`}
                            >
                                <EditIcon style={{ fontSize: 30 }} />
                            </IconButton>

                            <IconButton
                                color="secondary"
                                aria-label="Add a new reply"
                                onClick={handleDelete}
                            >
                                <DeleteForeverIcon style={{ fontSize: 30 }} />
                            </IconButton>
                        </div>
                        <Typography variant="h3" gutterBottom>{post.title}<br /></Typography>
                        {post.body}
                    </Paper>
                </Container>
            </div>
        )
    }
}

export default ShowOnePost