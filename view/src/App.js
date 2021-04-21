import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './components/ShowAllPosts'
import CreateOrEditPost from './components/CreateOrEditPost'
import ShowOnePost from './components/ShowOnePost'
import SideBar from './navigation/SideBar'
import Footer from './navigation/Footer'
import StaticContent from './components/StaticContent'
import CreateStaticPage from './components/CreateStaticPage'
import TopBar from './navigation/TopBar'
import ShowAllCategoryPosts from './components/category/ShowAllCategoryPosts';
import Home from './components/Home'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles'
import LogIn from './components/LogIn';
import { firebase } from './environment/environment'

const useStyles = makeStyles({
  root: {
      flexGrow: 1
  },
  container: {
    display: 'grid',
    gridGap: 1
  },
  paper: {
    padding: 8,
    color: 'secondary',
    marginBottom: 1
  }
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('logged in')
  } else {
    console.log('logged out')
  }
})

const App = () => {
  const classes = useStyles()

  return(
    <Router>
      <TopBar />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
              <Paper className={classes.paper} elevation={0}>
                  <SideBar/>
              </Paper>
          </Grid>

          <Grid item xs={12} md={9} lg={9}>
            <Paper className={classes.paper} elevation={0}>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/new" render={(props) => <CreateOrEditPost {...props} edit={false} />} />
                
                <Route exact path="/posts/:postId" component={ShowOnePost} />
                <Route exact path="/posts/:postId/edit" render={(props) => <CreateOrEditPost {...props} edit={true} />} />

                <Route exact path="/static/new" component={CreateStaticPage} />
                <Route exact path="/static/:page" component={StaticContent} />
                <Route exact path="/categories/:categoryName" component={ShowAllCategoryPosts} />
                <Route exact path="/test" component={Home} />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Router>
  )
}

export default App