import React, { useEffect, useState } from 'react'

const StaticContent = (props) => {

    let pageName = props.match.params.page
    let [pageContent, setPageContent] = useState({})

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/static/${pageName}`)
        .then(response => response.json())
        .then(data => setPageContent(data))
        .catch(error => console.log(error))
    },[])

    console.log(pageContent, "page content")
    return(
        <>
        {pageContent.title}

        {pageContent.body}
        </>
    )
}

export default StaticContent