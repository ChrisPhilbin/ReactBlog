import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import DisplayPost from "./DisplayPost";
import { fetchManyPosts } from "../actions/PostActions";

const useStyles = makeStyles({
  root: {
    width: "90%",
  },
  spacer: {
    height: 100,
  },
  toolbarSpacer: {
    height: 40,
  },
  uiProgess: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    margin: 10,
  },
});

const ShowAllPosts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let posts = useSelector((state) => state.posts.manyPosts);
  let loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchManyPosts());
  }, []);

  if (loading && !posts.length) {
    return (
      <div className={classes.root}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.toolbarSpacer} />
        <Container maxWidth="lg">
          {posts.map((post) => (
            <DisplayPost post={post} key={post.postId} />
          ))}
        </Container>
        <div className={classes.spacer} />
      </div>
    );
  }
};

export default ShowAllPosts;
