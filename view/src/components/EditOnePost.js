import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ShowLoading from './ShowLoading'
import { useGetTokenFromLocalStorage, useIsLoggedIn } from '../hooks/customHooks'
import { Typography } from '@material-ui/core'

const EditOnePost = (props) => {

    console.log(props, "props")

    useIsLoggedIn(props.history)

    const token = useGetTokenFromLocalStorage()

    let [loading, setLoading]       = useState(true)
    let [post, setPost]             = useState({})
    let [categories, setCategories] = useState([])
    let [categoriesLoading, setCategoriesLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`)
        .then(response => response.json())
        .then(data =>{
            setPost(data)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
            setCategoriesLoading(false)
        })
        .catch(error => console.log(error, "Something went wrong fetching the categories"))
    },[])

    console.log(categories)

    const handlePostUpdate = () => {
        let updatedPost = {
            title: post.title,
            body: post.body
        }
        fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedPost),
            headers: {
                'Content-type': 'application/json',
                'authorization':token
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

    if (loading || categoriesLoading) {
        return(
            <ShowLoading />
        )
    } else {
        return(
            <Container>
            <Typography variant="h4" gutterBottom>Edit Post</Typography>
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