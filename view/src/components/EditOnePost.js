import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
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

    if (loading) {
        return(
            <div>
                Edit one post
            </div>
        )
    } else {
        return(
            <Container>
                <TextField label="Post Title" defaultValue={post.title} />
                <TextField label="Post Title" multiline rows={16} defaultValue={post.body} />
            </Container>
        )
    }

}

export default EditOnePost