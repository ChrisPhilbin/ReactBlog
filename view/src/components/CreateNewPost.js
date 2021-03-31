import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const CreateNewPost = () => {

    let [post, setPost] = useState({})

    return (
        <Container maxWidth="lg">
            <Paper elevation={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Post Title" onChange={(e) => setPost({...post, title: e.target.value})} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={16} label="Post Body" onChange={(e) => setPost({...post, body: e.target.value})} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CreateNewPost