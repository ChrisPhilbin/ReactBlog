import React from 'react'
import { Link } from 'react-router-dom'

const useFormatPost = (post) => {
    console.log(post, "post from custom hook")
    const maxLength = 350

    let shortenedPost = post.body.substring(0,maxLength)
    return(
        <div>
        {shortenedPost} <Link to={`/posts/${post.postId}`}> ...Read more</Link>
        </div>
    )
}

export default useFormatPost