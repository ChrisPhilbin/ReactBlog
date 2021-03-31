import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const EditOnePost = (props) => {

    let [loading, setLoading] = useState(true)
    let [post, setPost]       = useState({})

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`)
        .then(response => response.json())
        .then(data =>{
            setPost(data)
            setLoading(false)
        })
    },[])

    console.log(post, "post")

    const handlePostUpdate = () => {
        let updatedPost = {
            title: post.title,
            body: post.body
        }
        fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedPost),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Post updated!")
                props.history.push('/posts')
            } else {
                alert("Something went wrong!")
            }
        })
        .catch(error => console.log(error, "something went wrong"))

    }

    if (loading) {
        return(
            <div>
                Edit one post
            </div>
        )
    } else {
        return(
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Post Title" defaultValue={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth label="Post Title" multiline rows={16} defaultValue={post.body} onChange={(e) => setPost({...post, body: e.target.value})} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={handlePostUpdate}>Save</Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default EditOnePost