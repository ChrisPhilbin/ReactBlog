import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const StaticContent = (props) => {

    let pageName = props.match.params.page
    let [pageContent, setPageContent] = useState({})
    let [errors, setErrors]           = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/static/${pageName}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response, "response")
                response.json()
                .then(data => setPageContent(data))
                .catch(error => console.log(error, "something went wrong"))
            } else {
                setErrors(true)
            }
        })
    },[])

    if (errors) {
        return(
            <>
            Error! Pages doesn't exist!
            </>
        )
    } else {
        return(
            <>
                <Typography variant="h3">{pageContent.title}</Typography>

                {pageContent.body}
            </>
        )
    }

}

export default StaticContent