import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ShowLoading from "./ShowLoading";
import { deleteOnePost, fetchOnePost } from "../actions/PostActions";

const useStyles = makeStyles({
  postIcons: {
    position: "relative",
    float: "right",
    right: 0,
    top: 0,
  },
  root: {
    width: "90%",
  },
  postPaper: {
    position: "relative",
    padding: 10,
    margin: 10,
  },
});

const ShowOnePost = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => state.sessions.isLoggedIn);

  let post = useSelector((state) => state.posts.onePost);
  let loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchOnePost(props.match.params.postId));
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteOnePost(props.match.params.postId));
    }
  };

  if (loading) {
    return <ShowLoading />;
  } else {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Paper className={classes.postPaper} elevation={3}>
            {isLoggedIn ? (
              <div className={classes.postIcons}>
                <IconButton
                  color="primary"
                  aria-label="Add a new reply"
                  href={`/posts/${props.match.params.postId}/edit`}
                >
                  <EditIcon style={{ fontSize: 30 }} />
                </IconButton>

                <IconButton
                  color="secondary"
                  aria-label="Add a new reply"
                  onClick={handleDelete}
                >
                  <DeleteForeverIcon style={{ fontSize: 30 }} />
                </IconButton>
              </div>
            ) : null}
            <Typography variant="h3" gutterBottom>
              {post.title}
              <br />
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </Paper>
        </Container>
      </div>
    );
  }
};

export default ShowOnePost;
