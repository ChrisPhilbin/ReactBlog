import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './components/ShowAllPosts'
import CreateNewPost from './components/CreateNewPost'
import ShowOnePost from './components/ShowOnePost'
import EditOnePost from './components/EditOnePost'
import SideBar from './navigation/SideBar'
import Footer from './navigation/Footer'
import StaticContent from './components/StaticContent'
import CreateStaticPage from './components/CreateStaticPage'
import TopBar from './navigation/TopBar'
import ShowAllCategoryPosts from './components/category/ShowAllCategoryPosts';
import Home from './components/Home'

const App = () => {
  return(
    <Router>
      <div>
        <SideBar />
          <TopBar />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/new" component={CreateNewPost} />
            <Route exact path="/posts/:postId" component={ShowOnePost} />
            <Route exact path="/posts/:postId/edit" component={EditOnePost} />
            <Route exact path="/static/new" component={CreateStaticPage} />
            <Route exact path="/static/:page" component={StaticContent} />
            <Route exact path="/categories/:categoryName" component={ShowAllCategoryPosts} />
            <Route exact path="/test" component={Home} />
            <SideBar />
          </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App