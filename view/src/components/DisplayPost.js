import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  postPaper: {
    padding: 20,
    marginBottom: 45,
    fontFamily: "arial",
  },
  postTitle: {
    fontWeight: "bold",
    textDecoration: "none",
  },
  subTitle: {
    fontWeight: "bold",
  },
});

const DisplayPost = (props) => {
  const post = props.post;

  const classes = useStyles();

  const maxLength = 350;

  const formatPost = (post) => {
    let shortenedPost = post.body.substring(0, maxLength);
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: shortenedPost }} />{" "}
        <Link to={`/posts/${post.postId}`}> ...Read more</Link>
      </div>
    );
  };

  return (
    <Paper key={post.postId} className={classes.postPaper} elevation={8}>
      <Typography variant="h5" gutterBottom className={classes.postTitle}>
        <Link
          to={"/posts/" + post.postId}
          style={{ textDecoration: "none", color: "dodgerBlue" }}
        >
          {post.title}
        </Link>
      </Typography>
      {post.category ? (
        <span className={classes.subTitle}>
          <em>
            Posted in{" "}
            <Link to={"/categories/" + post.category}>{post.category}</Link> -{" "}
            {moment(post.createdAt).format("LL")}
            <br />
            <br />
          </em>
        </span>
      ) : null}
      {post.body.length >= maxLength ? (
        formatPost(post)
      ) : (
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      )}
    </Paper>
  );
};

export default DisplayPost;
