import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import ShowLoading from './ShowLoading'

const StaticContent = (props) => {

    let pageName = props.match.params.page
    let [pageContent, setPageContent] = useState({})
    let [errors, setErrors]           = useState(false)
    let [loading, setLoading]         = useState(true)

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + `/static/${pageName}`)
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => {
                    setPageContent(data)
                    setLoading(false)
                })
                .catch(error => console.log(error, "something went wrong"))
            } else {
                setErrors(true)
            }
        })
    })

    if (errors) {
        return(
            <>
                Error! Page doesn't exist!
            </>
        )
    } else if (loading) {
        return(
            <ShowLoading />
        )
    }else {
        return(
            <>
                <Typography variant="h3">{pageContent.title}</Typography>

                {pageContent.body}
            </>
        )
    }

}

export default StaticContent