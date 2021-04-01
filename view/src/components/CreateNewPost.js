import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    postPaper: {
        position: 'relative',
        padding: 10,
        margin: 10
    }
})

const CreateNewPost = (props) => {

    const classes = useStyles()

    let [post, setPost] = useState({})

    const handleSubmit = () => {
        let newPost = {
            title: post.title,
            body:  post.body
        }
        fetch(process.env.REACT_APP_CORS + '/posts', {
            method: 'post',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Post created!")
                props.history.push('/')
            }
        })
        .catch(error => console.log(error, "something went wrong"))
    }

    console.log(post, "post object with keys/values")

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} className={classes.postPaper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Post Title" onChange={(e) => setPost({...post, title: e.target.value})} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={16} label="Post Body" onChange={(e) => setPost({...post, body: e.target.value})} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Create Post</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CreateNewPost