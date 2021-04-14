import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ShowLoading from './ShowLoading'

const useStyles = makeStyles({
    root: {
		display: 'flex'
	},
    categoryLink: {

    },
    categories: {
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

const CategoryLinks = () => {

    const classes = useStyles()

    let [loading, setLoading]       = useState(true)
    let [categories, setCategories] = useState([])
    let [error, setError]           = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setError(true)
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
            <div className={classes.categories}>
            <Typography variant="h4" gutterBottom>Categories</Typography>
                <List>
                    {categories.map((category) => (
                        <Link to={"/categories/" + category.name} className={classes.categoryLink} key={category.categoryId}>
                            <ListItem button key={category.categoryId}>
                                <ListItemText primary={category.name}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        )
    }

}

export default CategoryLinks