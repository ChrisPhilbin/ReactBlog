import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ShowLoading from "../ShowLoading";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  static: {
    padding: 10,
    margin: 10,
  },
  uiProgess: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    margin: 10,
  },
});

const StaticPagesList = () => {
  const classes = useStyles();

  let [loading, setLoading] = useState(true);
  let [staticPages, setStaticPages] = useState([]);
  let [error, setError] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_CORS + "/static")
      .then((response) => response.json())
      .then((data) => {
        setStaticPages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  if (loading) {
    return <ShowLoading />;
  } else if (error) {
    <div>Error, something went wrong!</div>;
  } else {
    return (
      <div className={classes.static}>
        <Typography variant="h4" gutterBottom>
          Static Pages
        </Typography>
        <List>
          {staticPages.map((page) => (
            <Link
              to={"/static/" + page.title}
              className={classes.staticLink}
              key={page.title}
            >
              <ListItem button key={page.title}>
                <ListItemText primary={page.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  }
};

export default StaticPagesList;
