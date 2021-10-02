import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { useCheckToken } from "../hooks/customHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1400,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  ["@media (min-width: 1024px)"]: {
    menuButton: {
      display: "none",
    },
    loginButton: {
      color: "white",
      textDecoration: "none",
    },
  },
  ["@media (max-width: 1024px)"]: {
    loginButton: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => state.sessions.isLoggedIn);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    localStorage.removeItem("AuthToken");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <div className={classes.menuButton}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon onClick={handleClick} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </IconButton>
          </div>
          <Typography variant="h4" className={classes.title}>
            React Blog
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleSignout}>
              Signout
            </Button>
          ) : (
            <Link to="/login" className={classes.loginButton}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
