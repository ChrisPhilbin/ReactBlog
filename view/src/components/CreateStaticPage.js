import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { useGetTokenFromLocalStorage } from '../hooks/customHooks'

const useStyles = makeStyles({
    postPaper: {
        position: 'relative',
        padding: 10,
        margin: 10
    }
})

const CreateStaticPage = () => {

    const classes = useStyles()

    const token = useGetTokenFromLocalStorage()

    let [title, setTitle] = useState('')
    let [body, setBody]   = useState('')

    const handleStaticPageSubmit = () => {
        let newStaticPage = {
            title: title.toLocaleLowerCase(),
            body: body
        }

        fetch(process.env.REACT_APP_CORS + '/static', {
            method: 'post',
            body: JSON.stringify(newStaticPage),
            headers: {
                'Content-Type':'application/json',
                'authorization':token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, "data returned from new static page")
            alert("Page created!")
            window.location.reload()
        })
        .catch(error => console.log(error, "something went wrong"))
    }
    return(
    <Container maxWidth="md">
        <Paper elevation={3} className={classes.postPaper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Static Page Title" onChange={(e) => setTitle(e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={16} label="Static Page Body" onChange={(e) => setBody(e.target.value)} />
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={handleStaticPageSubmit}>Create Static Page</Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
    )
}

export default CreateStaticPage