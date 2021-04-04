import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
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

    let [post, setPost]                           = useState({})
    let [category, setCategory]                   = useState('')
    let [categories, setCategories]               = useState([])
    let [categoriesLoading, setCategoriesLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
            console.log(data, "showing categories returned from API")
            setCategoriesLoading(false)
        })
        .catch(error => console.log(error, "Something went wrong fetching the categories"))
    },[])

    const handlePostSubmit = () => {
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

    if (!categoriesLoading && categories.length) {
        return (
            <Container maxWidth="md">
                <Paper elevation={3} className={classes.postPaper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Post Title" onChange={(e) => setPost({...post, title: e.target.value})} />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel id="category-select-label">Category</InputLabel>

                            <Select
                                displayEmpty
                                labelId="category-select-label"
                                id="category-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="" disabled>
                                    Select category
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem value={category.name} key={category.categoryId}>{category.name}</MenuItem>
                                ))}
                            </Select>

                            <Button>New category</Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={16} label="Post Body" onChange={(e) => setPost({...post, body: e.target.value})} />
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={handlePostSubmit}>Create Post</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    } else {
        return(
            <>
            Loading form...
            </>
        )
    }
}

export default CreateNewPost