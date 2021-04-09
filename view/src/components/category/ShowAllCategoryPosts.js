import React, { useEffect, useState} from 'react'

const ShowAllCategoryPosts = (props) => {

    const categoryName = props.match.params.categoryName
    let [loading, setLoading] = useState(true)
    let [posts, setPosts]     = useState([])
    let [errors, setErrors]   = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/categories/${categoryName}`)
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => setPosts(data))
                .then(setLoading(false))
            } else {
                setErrors(true)
            }
        })
    })

    console.log(posts, "posts from category")
    if (loading) {
        return (
            <>
            Loading...
            </>
        )
    } else if (errors) {
        return(
            <>
            Error, something went wrong
            </>
        )
    } else {
        return(
            <>
            Showing all posts within category
            </>
        )
    }
}

export default ShowAllCategoryPosts