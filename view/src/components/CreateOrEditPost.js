import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { useGetTokenFromLocalStorage } from '../hooks/customHooks'

const useStyles = makeStyles({
    postPaper: {
        position: 'relative',
        padding: 10,
        margin: 10
    }
})

const CreateNewPost = (props) => {

    const classes = useStyles()

    const token = useGetTokenFromLocalStorage()

    const edit = props.edit 

    let [post, setPost]                           = useState({})
    let [method, setMethod]                       = useState('post')
    let [suffix, setSuffix]                       = useState('/posts')
    let [addedCategory, setAddedCategory]         = useState('')
    let [categories, setCategories]               = useState([])
    let [categoriesLoading, setCategoriesLoading] = useState(true)
    let [dialogOpen, setDialogOpen]               = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
            setCategoriesLoading(false)
        })
        .catch(error => console.log(error, "Something went wrong fetching the categories"))
    },[])

    useEffect(() => {
        if (edit) {
            fetch(process.env.REACT_APP_CORS + `/posts/${props.match.params.postId}`)
            .then(response => response.json())
            .then(data =>{
                setPost(data)
                setMethod("put")
                setSuffix(`/posts/${props.match.params.postId}`)
            })
        }
    },[])

    const handlePostSubmit = () => {
        let newPost = {
            title: post.title,
            body:  post.body,
            category: post.category
        }
        fetch(process.env.REACT_APP_CORS + suffix, {
            method: method,
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type':'application/json',
                'authorization':token

            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Post saved!")
                props.history.push('/')
            }
        })
        .catch(error => console.log(error, "something went wrong"))
    }

    const handleCategorySubmit = () => {
        let newCategory = {
            name: addedCategory
        }
        fetch(process.env.REACT_APP_CORS + '/categories', {
            method: 'post',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-Type':'application/json',
                'authorization':token
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("New category created!")
            setCategories([...categories, data])
            setDialogOpen(false)
        })
        .catch(error => {
            console.log(error, "something went wrong")
            alert("Something went wrong, please try again!")
        })
    }

    console.log(post, "post object")

    if (!categoriesLoading && categories.length) {
        return (
            <>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add a new category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add the name of the new category below
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Category name"
                            onChange={(e) => setAddedCategory(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleCategorySubmit()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Container maxWidth="md">
                    <Paper elevation={3} className={classes.postPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Post Title" value={post.title || ''} onChange={(e) => setPost({...post, title: e.target.value})} />
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id="category-select-label">Category</InputLabel>

                                <Select
                                    
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={post.category}
                                    onChange={(e) => setPost({...post, category: e.target.value})}
                                >
                                    <MenuItem value="" disabled>
                                        Select category
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem value={category.name} key={category.categoryId}>{category.name}</MenuItem>
                                    ))}
                                </Select>

                                <Button onClick={() => setDialogOpen(true)}>New category</Button>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={16} label="Post Body" value={post.body || ''} onChange={(e) => setPost({...post, body: e.target.value})} />
                            </Grid>

                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" onClick={handlePostSubmit}>{edit ? "Save Changes" : "Create Post"}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </>
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