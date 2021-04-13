import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import DisplayPost from '../DisplayPost'
import ShowLoading from '../ShowLoading'

const useStyles = makeStyles({
    root: {
      width: '75%'
    },
    spacer: {
        height: 100,
    },
    toolbarSpacer: {
        height: 40
    }
})

const ShowAllCategoryPosts = (props) => {

    const classes = useStyles()

    let [posts, setPosts]     = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/categories/${props.match.params.categoryName}`)
        .then(response => {
            if (response.status) {
                response.json()
                .then(data => {
                    setPosts(data)
                    setLoading(false)
                })
            }
        },[])
        .catch(error => console.log(error, "something went wrong"))
    })

    if (loading) {
        return(
            <ShowLoading />
        )
    } else {
        if (posts.length === undefined) {
            return(
                <div>
                    There are no posts yet in this category
                </div>
            )           
        } else {

            return(
                <div className={classes.root}>
                    <div className={classes.toolbarSpacer} />
                    <Container maxWidth="lg">
                        {posts.map((post) => (
                            <DisplayPost post={post} />
                        ))}
                    </Container>
                    <div className={classes.spacer} />
                </div>
            )
        }
    }
}

export default ShowAllCategoryPosts